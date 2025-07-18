# k6-perf-test
```
how-to-run: 
command load K6 per/sec
> k6 run --vus 10 --iterations 50

command load by duration per/sec
> k6 run --vus 10 --duration 30s --max 20 <script-name>.js

HOW TO DEBUG USING IN K6
- k6 run --http-debug="full" <filename>

summary value: 
- duration : เวลาที่จะใช้ทดสอบ (ในที่นี้ไม่ได้ระบุ จึงไม่ได้ใช้)
- iterations : จำนวนครั้ง request ที่ใช้ทดสอบ (ในที่นี้ไม่ได้ระบุ จึงเป็นค่า 1)
- vus : ย่อมาจาก virtual user หรือการจำลองคนใช้งาน 1 คน (ในที่นี้ไม่ได้ระบุ จึงเป็นค่า 1)
- max : คือจำนวน vus มากที่สุดที่จะใช้ทดสอบ โดยจะใช้ระบุคู่กับ duration เท่านั้น (ในที่นี้ไม่ได้ระบุ จึงเป็นค่า 1) และในการทำ stage จะใช้ชื่อว่า target
- data_received : จำนวน Byte ที่มีการรับกลับมาจากการทดสอบ
- data_sent : จำนวน Byte ที่มีการส่งออกไปเพื่อทดสอบ
- http_req_duration : จำนวนเวลารวมที่มีการ request ทดสอบ (ผลรวมของ http_req_sending + http_req_waiting + http_req_receiving)
- http_reqs : จำนวนครั้งที่มี request ในช่วงเวลา duration ที่กำหนด

```
