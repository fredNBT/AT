// Import required libraries
#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <Wire.h>
// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
const char* ssid = "ESP32-Access-Point";
const char* password = "123456789";
String TurnOnLED() {
  Serial.println("STEVE!!");
  //return String(bme.readTemperature());
  //return String(1.8 * bme.readTemperature() + 32);
}



void setup() {
  Serial.begin(115200);
  WiFi.softAP(ssid, password);
  server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send_P(200, "text/plain", TurnOnLED().c_str());
});
}

void loop() {
  // put your main code here, to run repeatedly:
}
