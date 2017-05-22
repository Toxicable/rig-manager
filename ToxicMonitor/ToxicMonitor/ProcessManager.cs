using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ToxicMonitor
{
    public class ProcessManager
    {
        public List<Process> _processes = new List<Process>();

        public Process SetupProcess(string path, string args)
        {
            Process process = new Process();
            process.StartInfo.FileName = path;//@"C:\Mining\miners\claymores\EthDcrMiner64.exe";
            process.StartInfo.Arguments = args; //"-epool us2.ethermine.org:4444 -ewal 0x9d206d99d691a486a5f552108416c09dce0e594f.worker2 -epsw x -dpool stratum+tcp://dcr.suprnova.cc:3252 -dwal ToxicPhyzix.worker2 -dpsw x";
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.CreateNoWindow = false;
            _processes.Add(process);
            return process;
        }
        public void test()
        {
           // Process process = new Process();
           // process.StartInfo.FileName = @"C:\Mining\miners\claymores\EthDcrMiner64.exe";
           // process.StartInfo.Arguments = "-epool us2.ethermine.org:4444 -ewal 0x9d206d99d691a486a5f552108416c09dce0e594f.worker2 -epsw x -dpool stratum+tcp://dcr.suprnova.cc:3252 -dwal ToxicPhyzix.worker2 -dpsw x";
           // process.StartInfo.UseShellExecute = false;
           // process.StartInfo.RedirectStandardOutput = true;
           //// process.StartInfo.RedirectStandardInput = true;
           // process.StartInfo.CreateNoWindow = false;
           // process.OutputDataReceived += (s, e) =>
           // {
           //     Console.WriteLine(e.Data);
           // };
           // process.StandardOutput
           //      = 
           // process.Start();
           // while (true)
           // {
           //     process.StandardOutput.BaseStream.Flush() ;
           //     Thread.Sleep(10000);
           // }


           // process.WaitForExit();
        }
    }
}
