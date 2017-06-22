using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToxicMonitor
{
    public class Miner
    {
        public string Name { get; set; }
        public float Rate { get; set; }
        public List<Log> Console { get; set; }
    }
}
