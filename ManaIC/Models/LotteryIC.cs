using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManaIC.Models
{
    public class LotteryIC
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Faculty { get; set; }
        public DateTime? DeleteDate { get; set; }
    }
}
