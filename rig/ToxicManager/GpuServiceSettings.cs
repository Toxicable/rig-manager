using OpenHardwareMonitor.Hardware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToxicMonitor
{
    public class GpuServiceSettings : ISettings
    {
        public Dictionary<string, string> store = new Dictionary<string, string>
        {
            {"/atigpu/0/temperature/0/values" ,"H4sIAAAAAAAEALt07rPp3QVXPBgYJjk9VdspxAAGk5wA9h/EMxgAAAA=" },
            {"/atigpu/0/fan/0/values" ,"H4sIAAAAAAAEAPN59Nn07oIrHgwCVi5PPnIwMYAAkP2vOhnCdrByyW9MhLA/WLrIL02CsC9YukyLg4ofsHRpv5YEV2+3G8pOsHLZvBWqxsDKBQAbp1eZbAAAAA==" },
            {"/atigpu/0/clock/0/values" ,"H4sIAAAAAAAEAPN59Nn07oIrHq3mM1zmBnMyMQBB0IYZLiUZyWD2w5YZLsFRiWD2jp4ZLufuJ4HZa1uBarwh4jHqM11Er0HEX0+d4WKxG8JOa5jhsrwPomZCxwwXAEXcp6FsAAAA" },
            {"/atigpu/0/clock/1/values" ,"H4sIAAAAAAAEAPN59Nn07oIrHgwHbrnMStwpxAACQDYAL0ye3hgAAAA=" },
            {"/atigpu/0/voltage/0/values" ,"H4sIAAAAAAAEAPN59Nn07oIrHmVfaz3nBnMyMQCBv99Kz7+8GwRgbADtwBTDJAAAAA==" },
            {"/atigpu/0/load/0/values" ,"H4sIAAAAAAAEAPN59Nn07oIrHgwMJ5zmBnMyMYDBCaeSjGQoe6lTcFQiXPzc/SQIu2GzU4k3Qlz0WhKcbbEbpmaT0/I+hBoAQwmrZ2wAAAA=" },
            {"/atigpu/0/control/0/values" ,"H4sIAAAAAAAEAPN59Nn07oIrHgwMHY51VjuFGMCgwxEAJETs+BgAAAA=" },
        };
        public bool Contains(string name)
        {
            return this.store.ContainsKey(name);
        }

        public string GetValue(string name, string value)
        {
            if (store.ContainsKey(name))
            {
                return store[name];
            }
            else
            {
                return value;
            }
        }

        public void Remove(string name)
        {
            this.store.Remove(name);
        }

        public void SetValue(string name, string value)
        {
            this.store[name] = value;
        }
    }
}
