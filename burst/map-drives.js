var exec = require('child_process').execSync;
var newLine = require('os').EOL;
newLine = '\n';

function mapDrive(name){
  console.log('mapping: ' + 'name')
  exec(`sudo mount -t /dev/${name} /mining/drives/${name}`)
}

exec('ls /dev/ | grep sd', (error, stdout, stderr) => {
  var drives = getDriveNames();
  console.log('found drives: ' + drives.join(',') )
  drives.foreEach(drive => mapDrive(drive));
});

function getDriveNames(){
  return stdout
    .split(newLine)
    .filter(name => /sd(\w)([0-9])/.test(name));

}
