# pylint: disable-all
import sys
from threading import Timer
import pyrebase

argsConfig = {}

for i in range((len(sys.argv) - 1)/2):
    argsConfig[sys.argv[i * 2 + 1]] = sys.argv[i * 2 + 2]

email = argsConfig['-email']
password = argsConfig['-password']

firebaseConfig = {
    'apiKey': "AIzaSyCZ6ILlZibhW2SyZBbKZRKy4Xw23RCfB4M",
    'authDomain': "rig-monitor-594db.firebaseapp.com",
    'databaseURL': "https://rig-monitor-594db.firebaseio.com",
    'projectId': "rig-monitor-594db",
    'storageBucket': "rig-monitor-594db.appspot.com",
    'messagingSenderId': "965530157416"
}

firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()

user = auth.sign_in_with_email_and_password(email, password)



db = firebase.database()

rigs = db.child(user['localId'] + '/rigs').get()


def stream_handler(message):
  for rig in message['data']:
    if(rig.shouldRestart):
      rebootRig(rig.ip)

rigsStream = db.child(user['localId'] + '/rigs').stream(stream_handler, user['idToken'])


def refresh_token():
    user = auth.sign_in_with_email_and_password(email, password)
    user = auth.refresh(user['refreshToken'])
    db.child(user['localId'] + '/rigs').stream(stream_handler, user['idToken'])

refreshTimer = Timer(20 * 60, refresh_token)
refreshTimer.start()

while True:
    input('ima keep us alive')



# from pyA20.gpio import gpio
# from pyA20.gpio import port
# from time import sleep

# gpio.init()

# pinMapping = {
#     1: port.PA7,
#     2: port.PA8,
#     3: port.PA9,
#     4: port.PA10,
#   }

# for pin in pinMapping.values():
#   gpio.setcfg(pin, gpio.OUTPUT)
#   gpio.output(pin, gpio.HIGH)

# def turnOn(number):
#   pin = pinMapping[number]
#   gpio.output(pin, gpio.LOW)
#   sleep(2)
#   gpio.output(pin, gpio.LOW)

# turnOn(1)
# turnOn(3)

# gpio.cleanup()

