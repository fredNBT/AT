unsigned long previousMillis = 0;
const long interval = 1000;
const int led = 26;
int ledState = LOW;

void setup() {
  // put your setup code here, to run once:
  pinMode(led, OUTPUT);
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval ){
    previousMillis = currentMillis;
    

    if (ledState == LOW){
      ledState = HIGH;
      }else {
        ledState = LOW;
      }
      digitalWrite(led, ledState);
}
}

      
  
  

