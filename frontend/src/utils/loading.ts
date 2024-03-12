export const loadingStrings = [
  'Parsing Data',
  'Analyzing Data',
  'Loading',
  'Connecting',
  'Calibrating',
  'Optimizing',
  'Initializing',
  'Syncing',
  'Configuring',
  'Downloading',
  'Uploading',
  'Processing',
  'Compiling',
  'Building',
];

export function getRandomString(currentString: string, listOfStrings: string[]): string {
  let newString = currentString;
  while (newString === currentString) {
    newString = listOfStrings[Math.floor(Math.random() * listOfStrings.length)];
  }
  return newString;
}
