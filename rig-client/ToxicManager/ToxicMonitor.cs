using OpenHardwareMonitor.Hardware;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using Timer = System.Timers.Timer;
namespace ToxicMonitor
{
    
    public class ToxicMonitor
    {
        public static GpuService _gpuMonitor { get; set; }
        public static ProcessManager _processManager { get; set; }
        public static DataService _dataService { get; set; }
        public static Timer _clock { get; set; }

        static void Main(string[] args)
        {
            var mainThread = Task.Run(() =>
             {
                 MainAsync(args).Wait();

             });
            while (true)
            {
                Console.ReadKey();
            }
        }
        static async Task MainAsync(string[] args)
        {
            _dataService = new DataService();

            await PrintWelcome();

            await _dataService.Log("Beginning Startup...");

            var argsDict = ParseArgs(args);
            await _dataService.Init(argsDict["--email"], argsDict["--password"]);

            _gpuMonitor = new GpuService();
            _processManager = new ProcessManager();

            await _dataService.UpdateGpuInfo(_gpuMonitor.GetStats());

            SetClock(5000);         
        }   
        
        static void SetClock(int interval)
        {
            var _clock = new Timer();
            _clock.Elapsed += new ElapsedEventHandler(ClockTick);
            _clock.Interval = interval;
            _clock.Enabled = true;
        } 

        static void ClockTick(object sender, ElapsedEventArgs args)
        {

        }

        static async Task PrintWelcome()
        {
            await _dataService.Log("###################################");
            await _dataService.Log("########   Toxic Monitor   ########");
            await _dataService.Log("###################################");
        }

        static Dictionary<string, string> ParseArgs(string[] args)
        {
            var argsDict = new Dictionary<string, string>();
            for (int i = 0; i < args.Length / 2; i++)
            {
                argsDict[args[i * 2]] = args[i * 2 + 1];
            }

            return argsDict;
        }


    }
}
