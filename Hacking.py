# To test it with netcat, start the script and execute:
# 
#    echo "Hello, cat." | ncat.exe 127.0.0.1 12345
#
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('',51449))
s.listen(5)

while True:
    clientsocker, address = s.accept()
    print("were in !")