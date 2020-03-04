using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManaIC.Models
{
    public class BookListModel
    {
        public string Id { get; set; }
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Status { get; set; }
        public string Affiliation { get; set; }
        public string KKUStudentID { get; set; }
        public bool RegisterROV { get; set; }
        public string ROVTeam { get; set; }
        public bool RegisterCosplay { get; set; }
        public string Nickname { get; set; }
        public string RefCharacter { get; set; }
        public bool RegisterMovie { get; set; }
        public string MovieTeam { get; set; }
        public bool RegisterPoster { get; set; }
        public string PosterTeam { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? DeleteDate { get; set; }
        public DateTime? FirstDate { get; set; }
        public DateTime? SecondDate { get; set; }
        public DateTime? ThirdDate { get; set; }
    }

    public class Status
    {
        public string Student = "Student";
        public string Scholar = "Scholar";
        public string Guest = "Guest";
    }
}
