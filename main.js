console.log('works');
aja()
console.log('requesting')
  .url('http://192.168.2.12:8080/api/data.json')
  .type('jsonp')
  .jsonPaddingName('callbackParameter')
  .jsonPadding('someGlobalFunction')
  .on('success', function(data){
    console.log('succes')
      //fuk cross origin policy
      console.log(data);
  })
  .go();
