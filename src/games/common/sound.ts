var Sound = require('react-native-sound');

export function preloadFile(uri : any) {
  return new Promise((resolve, reject) => {
    var item = new Sound(uri, (error : any) => {
      if(error) {
        console.log('failed to load the sound', error);
        reject();
        return;
      }

      console.log('success load');

      console.log(item);

      resolve(item);
    });
  });
}
