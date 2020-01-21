#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <string.h>
const char* ssid = "MorphCon_Wifi";
const char* password = "aldor587974#@";
const char* mqtt_server = "78.47.164.96";
WiFiClient espClient;
PubSubClient client(espClient);

const int F = 35;
const int E = 34;
const int D = 36;
const int C = 32;
const int B = 5;
const int A = 33;// was 12
int AADC = 0;


void setup() {
  Serial.begin(9600);

  setup_wifi();
  client.setServer(mqtt_server, 1883);
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      // Subscribe
      client.subscribe("esp32/output");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}



void loop() {
  delay(100);
  String str = String(analogRead(F));;
Serial.println(str);
  
  Serial.println("loop");
  if (!client.connected()) {
    reconnect();
  }

if (analogRead(F) > 4090){

int str_len = str.length() + 1;
char char_array[str_len];
str.toCharArray(char_array, str_len);
  client.loop();
  client.publish("Alarm3", "1");
  }
 }


