# cloudflare-chatgpt
run chatgpt in cloudflare worker, then you can call it anywhere



### How to use cloudflare

cloudflare worker : https://workers.cloudflare.com/

You can have 100000 requests/day for free

### how to get cookies

Go to https://chat.openai.com/chat and log in or sign up.
Open dev tools.
Open Application > Cookies.

![image](https://user-images.githubusercontent.com/29261120/206084836-4f86f741-c560-4d0d-92c7-6cd8960c831a.png)


### How to request data
id && message_id ：Generated using uuid, it is recommended to use v4
url: xxxxxx
Method : 
POST
#### body :
  {
    "id" : "d8cc4969-23c8-4d2c-b5a9-7b85331d678c",
    "message" : "hello",
    "message_id" :"7e50d02c-4c79-407a-b8a9-56127d197c86"
  }
