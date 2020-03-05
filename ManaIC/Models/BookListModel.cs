using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManaIC.Models
{
    public class BookListOnFront
    {
        public BookList Book { get; set; }
        public string SubmitButtonText { get; set; }
    }
    public class BookList
    {
        public string Id { get; set; }
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Status { get; set; }
        public string Affiliation { get; set; }
        public string Faculty { get; set; }
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

    public class StatusEN
    {
        public static string Student = "Student";
        public static string Scholar = "Scholar";
        public static string Guest = "Guest";
    }

    public class StatusTH
    {
        public static string Student = "นักเรียน";
        public static string Scholar = "นักศีกษา";
        public static string Guest = "ทั่วไป";
    }
}
