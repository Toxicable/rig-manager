using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToxicMonitor
{
    public class Rig
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public GpuStats GpuStats { get; set; }
        public List<Miner> Miners { get; set; }

    }
}
