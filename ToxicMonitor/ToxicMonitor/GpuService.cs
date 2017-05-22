using OpenHardwareMonitor.Hardware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToxicMonitor
{
    public class GpuService
    {
        private readonly IHardware _gpu;

        public GpuService()
        {
            var settings = new GpuServiceSettings();
            var computer = new Computer(settings);
            computer.GPUEnabled = true;
            computer.Open();

            _gpu = computer.Hardware[0];
        }

        public GpuStats GetStats()
        {
            return new GpuStats
            {
                CoreTemp = _gpu.Sensors[0].Value,
                FanRPM = _gpu.Sensors[1].Value,
                FanPercent = _gpu.Sensors[2].Value,
                CoreSpeed = _gpu.Sensors[3].Value,
                MemorySpeed = _gpu.Sensors[4].Value,
                CoreVoltage = _gpu.Sensors[5].Value,
                CoreLoad = _gpu.Sensors[6].Value
            };
        }
    }
    public class GpuStats
    {
        public float? CoreTemp { get; set; }
        public float? FanRPM { get; set; }
        public float? FanPercent { get; set; }
        public float? CoreSpeed { get; set; }
        public float? MemorySpeed { get; set; }
        public float? CoreVoltage { get; set; }
        public float? CoreLoad { get; set; }
    }
}
