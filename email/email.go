package main

import (
	"fmt"
	"math/rand"
	"net/smtp"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	code := rand.Intn((999999-100000)+1) + 100000
	fmt.Println(code)
	//mail test
	emailhost := "outlook.wit.edu"
	sender := "xxxxx@wit.edu"
	recipient := "xxxxx@wit.edu"
	auth := LoginAuth(sender, "xxxxx")

	// Connect to the server, authenticate, set the sender and recipient,
	// and send the email all in one step.
	msg := []byte("To: " + recipient + "\r\n" +
		"Subject: test go email\r\n" +
		"\r\n" +
		"Your verification code is: " + fmt.Sprint(code) + "\r\n")
	err := smtp.SendMail(emailhost+":587", auth, sender, []string{recipient}, msg)
	if err != nil {
		fmt.Println(err)
	}
}
