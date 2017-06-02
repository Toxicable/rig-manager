# pylint: disable-all
import sys
import pyrebase
import urllib2
import datetime

from threading import Timer
from time import sleep
from pyA20.gpio import gpio
from pyA20.gpio import port

print('settting up GPIO')
gpio.init()

pinMapping = {
    1: port.PA7,
    2: port.PA8,
    3: port.PA9,
    4: port.PA10,
  }

for pin in pinMapping.values():
  gpio.setcfg(pin, gpio.OUTPUT)
  gpio.output(pin, gpio.HIGH)

def pressButton(number):
  print('presing button: ' + str(number))
  pin = pinMapping[number]
  gpio.output(pin, gpio.LOW)
  sleep(0.5)
  gpio.output(pin, gpio.HIGH)

def reset(number):
  pressButton(number)
  sleep(10)
  pressButton(number)

argsConfig = {}

for i in range((len(sys.argv) - 1)/2):
    argsConfig[sys.argv[i * 2 + 1]] = sys.argv[i * 2 + 2]

if not '-email' in argsConfig or not '-password' in argsConfig:
  print('your must provide an email and password , for example: python resetter.py -email myemail@email.com -password 123456')

email = argsConfig['-email']
password = argsConfig['-password']

print('email: ' + email)

firebaseConfig = {
    'apiKey': "AIzaSyCZ6ILlZibhW2SyZBbKZRKy4Xw23RCfB4M",
    'authDomain': "rig-monitor-594db.firebaseapp.com",
    'databaseURL': "https://rig-monitor-594db.firebaseio.com",
    'projectId': "rig-monitor-594db",
    'storageBucket': "rig-monitor-594db.appspot.com",
    'messagingSenderId': "965530157416"
}

print('setting up DB')
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
user = auth.sign_in_with_email_and_password(email, password)
db = firebase.database()

def stream_handler(message):
  try:
    print('noticed a change in the DB, check to see if we should restart something')
    for rig in db.child(user['localId'] + '/rigs').get(user['idToken']).each():
      value = rig.val()
      key = rig.key()
      if not value:
        continue
      if(value['shouldRestart']):
        reset(key)
        db.child(user['localId'] + '/rigs/' + str(key) + '/shouldRestart').set(False, user['idToken'])
  except Exception as ex:
    print('an error occured :/')
    print(ex.message)
    pass

rigsStream = db.child(user['localId'] + '/rigs').stream(stream_handler, user['idToken'])

def pingRigs():
  try:
    print('pining rigs')
    db.child(user['localId'] + '/lastPingCheck').set(datetime.datetime.now().isoformat(), user['idToken'])
    for rig in db.child(user['localId'] + '/rigs').get(user['idToken']).each():
      value = rig.val()
      if value and 'ipAddress' in value:
        try:
          body = urllib2.urlopen('http://' + value['ipAddress'] + ':3333').read()
        except Exception as ex:
          print('failed to ping IP:' + value['ipAddress'])
          print(ex.message)
          reset(rig.key())
          pass
        if not body:
          reset(rig.key())
  except Exception as ex:
    print('an error occured :/')
    print(ex.message)
    pass


aliveTimer = Timer(5 * 60, pingRigs)
aliveTimer.start()
pingRigs()

def refresh_token():
  print('refreshing auth token')
  user = auth.sign_in_with_email_and_password(email, password)
  user = auth.refresh(user['refreshToken'])
  db.child(user['localId'] + '/rigs').stream(stream_handler, user['idToken'])

refreshTimer = Timer(20 * 60, refresh_token)
refreshTimer.start()

print('ready to go!')
input()
