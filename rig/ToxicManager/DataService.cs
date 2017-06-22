using Firebase.Auth;
using Firebase.Database;
using Firebase.Database.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace ToxicMonitor
{
    public class DataService
    {
        private readonly string basePath = "https://rig-monitor-594db.firebaseio.com";
        private readonly string apiKey = "AIzaSyCZ6ILlZibhW2SyZBbKZRKy4Xw23RCfB4M";
        private FirebaseClient _client { get; set; }
        private ChildQuery _rig { get; set; }
        private ChildQuery _user { get; set; }
        private ChildQuery _log { get; set; }
        private List<Log> _logQueue = new List<Log>();

        public async Task Init(string email, string password)
        {
            await Log($"Authenticating...");
            var ap = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
            var auth = await ap.SignInWithEmailAndPasswordAsync(email, password);

            var options = new FirebaseOptions
{

}

            _client = new FirebaseClient(basePath, new FirebaseOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(auth.FirebaseToken),
                JsonSerializerSettings = new JsonSerializerSettings
                {
                  ContractResolver = new CamelCasePropertyNamesContractResolver()
                }
            });

            await Log($"Getting MAC Address...");
            var MAC = GetMACAddress();

            await Log($"Getting IP Address...");
            var ip = await GetIpAddress();

            await Log($"Connecting to DB...");
            _rig = _client.Child($"{auth.User.LocalId}/rigs/{MAC}");
            _user = _client.Child($"{auth.User.LocalId}");
            _log = _client.Child($"{auth.User.LocalId}/rigs/{MAC}/console");

            _logQueue.ForEach(async l => await LogQueued(l));

            await Log($"MAC: {MAC}");
            await Log($"IPAddress: {ip}");
            await Log($"Email: {email}");

            var rig = new Rig
            {
                IsActive = true
            };

            var user = new User
            {
                IpAddress = ip
            };

            await _user.PatchAsync(user);
            await _rig.PatchAsync(rig);

        }

        public async Task UpdateGpuInfo(GpuStats stats)
        {
            await _rig.PatchAsync(stats);
        }

        public async Task Log(string msg){
          Log(new Log
            {
                Message = msg,
                PostedAt = DateTime.Now.ToString("o")
            };)

        }
        public async Task Log(Log log)
        {
            if(_log == null)
            {
              _logQueue.Add(log);
              return;
            }
            
            try{

              await _log.PostAsync(log);
            } catch(Exception ex){
              var exceptionLog = new Log{
                Message = $"An Exception Occured: {ex.Message}",
                  PostedAt = DateTime.Now.ToString("o")
              };
              Console.WriteLine(exceptionLog.Message);
              _logQueue.Add(exceptionLog);
              _logQueue.Add(_log)
            }
           

            Console.WriteLine(msg);
        }
        public async Task ClearLogged(Log log)
        {
          for (int i = 0; i < _logQueue.Length; i++)
          {
            await _log.PostAsync(log);
            _logQueue[i]
          }
        }

        private async Task<string> GetIpAddress()
        {
            var httpClient = new HttpClient();
            var res = await httpClient.GetAsync("http://checkip.dyndns.org");
            var result = await res.Content.ReadAsStringAsync();
            string[] a = result.Split(':');
            string a2 = a[1].Substring(1);
            string[] a3 = a2.Split('<');
            return a3[0];
        }

        private string GetMACAddress()
        {
            return NetworkInterface.GetAllNetworkInterfaces()
                .Where(nic => nic.OperationalStatus == OperationalStatus.Up)
                .Select(nic => nic.GetPhysicalAddress().ToString())
                .FirstOrDefault();
        }
    }
}
