import sys
import pyrebase
import urllib2
import datetime
import threading

from time import sleep
from pyA20.gpio import gpio
from pyA20.gpio import port

def log(msg):
  st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
  print( '[' + st + '] ' + str(msg))

def set_interval(func, sec):
  def func_wrapper():
      set_interval(func, sec)
      func()
  t = threading.Timer(sec, func_wrapper)
  t.start()
  return t

log('settting up GPIO')
gpio.init()

ports = {
  'PA7': port.PA7,
  'PA8': port.PA8,
  'PA9': port.PA9,
  'PA10': port.PA10,
}

for pin in ports.values():
  gpio.setcfg(pin, gpio.OUTPUT)
  gpio.output(pin, gpio.HIGH)

def pressButton(port, sleepTime = 0.5):
  log('pressing port: ' + str(port))
  gpio.output(ports[port], gpio.LOW)
  sleep(sleepTime)
  gpio.output(ports[port], gpio.HIGH)

def reset(port):
  pressButton(port, 6)
  sleep(10)
  pressButton(port)

args = {}

for i in range((len(sys.argv) - 1)/2):
    args[sys.argv[i * 2 + 1]] = sys.argv[i * 2 + 2]

if not '-email' in args or not '-password' in args:
  log('your must provide an email and password , for example: python resetter.py -email myemail@email.com -password 123456')
  sys.exit()

email = args['-email']
password = args['-password']

log('email: ' + email)

firebaseConfig = {
    'apiKey': "AIzaSyCZ6ILlZibhW2SyZBbKZRKy4Xw23RCfB4M",
    'authDomain': "rig-monitor-594db.firebaseapp.com",
    'databaseURL': "https://rig-monitor-594db.firebaseio.com",
    'projectId': "rig-monitor-594db",
    'storageBucket': "rig-monitor-594db.appspot.com",
    'messagingSenderId': "965530157416"
}

log('setting up DB')
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
user = auth.sign_in_with_email_and_password(email, password)
userId = user['localId']
db = firebase.database()

def rigsChanged(message):
  try:
    log('DB change fired')
    for rig in db.child(userId + '/rigs').get(user['idToken']).each():
      value = rig.val()
      key = rig.key()
      if not value:
        continue
      if(value['shouldRestart']):
        reset(value['port'])
        db.child(userId + '/rigs/' + str(key) + '/shouldRestart').set(False, user['idToken'])
  except Exception as ex:
    log('an error occured :/')
    log(ex.message)
  finally:
    log('check done')

def pingRigs():
  try:
    log('pinging rigs')
    db.child(userId + '/lastPingCheck').set(datetime.datetime.now().isoformat(), user['idToken'])
    for rig in db.child(userId + '/rigs').get(user['idToken']).each():
      value = rig.val()
      if value and 'ipAddress' in value:
        try:
          body = urllib2.urlopen('http://' + value['ipAddress'] + ':3333').read()
          if not body:
            reset(value['port'])
        except Exception as ex:
          log('failed to ping IP:' + value['ipAddress'])
          log(ex.message)
          reset(value['port'])
          pass

  except Exception as ex:
    log('an error occured :/')
    log(ex.message)
  finally:
    log('done pinging rigs')

def refresh_token():
  global user
  global rigStream
  log('refreshing auth token')
  user = auth.refresh(user['refreshToken'])
  rigStream = db.child(userId + '/rigs').stream(rigsChanged, user['idToken'])

rigStream = db.child(userId + '/rigs').stream(rigsChanged, user['idToken'])
pingInterval = set_interval(pingRigs, 5 * 60)
refreshInterval = set_interval(refresh_token, 20 * 60)

log('ready to go!')
input()
