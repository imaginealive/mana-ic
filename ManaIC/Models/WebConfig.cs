using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManaIC.Models
{
    public class WebConfig
    {
        public string PromomeServiceId { get; set; }
        public string PromomeMerchantId { get; set; }

        public int Day1 { get; set; }
        public int Day2 { get; set; }
        public int Day3 { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }
}
