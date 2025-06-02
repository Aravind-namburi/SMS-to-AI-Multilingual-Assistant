const express = require('express');
const axios = require('axios');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const app = express();
const googleApiKey = 'put the GGL API key here';

app.use(bodyParser.urlencoded({extended:false}));

async function detectLanguage(apiKey, text) {
    const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
    
    const response = await axios.post(url, {
        q: text,
    });
    
    return response.data.data.detections[0][0].language;
    }

async function languageTranslations(googleApiKey, text,source_lang, dest_lang) {
    console.log("translating")

    const url = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;
    
    const response = await axios.post(url, {
        q: text,
        source: source_lang,
        target: dest_lang,
        format: 'text',
        key: googleApiKey,
    });
    console.log(response.data.data.translations[0].translatedText)
    return response.data.data.translations[0].translatedText;
    }

async function openAICall(text,max_tokens ) {
    const apiUrl = '';
    
    const postData ={
        "model": "text-davinci-003", 
        "prompt": text+", Provide answer in medical/health context and in 200 characters')", 
        "temperature": 0, 
        "max_tokens": max_tokens
    };

    const response = await axios.post(apiUrl,postData,{
    
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {Put OPEN AI key here}'
                  }
        });
    
    return response.data.choices[0].text;
}
    

app.post('/sms', async (req, res) => {
    const twiml = new twilio.twiml.MessagingResponse();
    // console.log(req)
    const message = req.body.Body;
    console.log(message)
    let openaiRes= ""
    
    try {

        let detectedLang = await detectLanguage(googleApiKey,message.toString());
        console.log(detectedLang);

        let translatedText = "";
        if(detectedLang!='en')
        {
            const pretranslatedText = await languageTranslations(googleApiKey, message.toString(), detectedLang, "en");
            console.log("pretranslatedText");
            console.log(pretranslatedText);
            
            
            const openaiResponse = await openAICall(pretranslatedText.toString(), 100);
            console.log(openaiResponse);
        
            translatedText = await languageTranslations(googleApiKey, openaiResponse, "en", detectedLang);
            console.log(translatedText);
         }else{

            //dont translate
            const openaiResponse = await openAICall(message.toString(), 200);
            console.log(openaiResponse);
            translatedText = openaiResponse.toString();
            console.log(translatedText+":translatedText")
         }

        twiml.message(translatedText);
        res.send(twiml.toString());
      } catch (error) {
        console.error(error);
      }

  });

app.listen(80, () => {
console.log('Server started on port 80');
});