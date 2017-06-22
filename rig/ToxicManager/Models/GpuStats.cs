
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToxicMonitor
{
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

