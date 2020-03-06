using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Display(Name = "ชื่อภาษาไทย")]
        public string NameTH { get; set; }
        [Display(Name = "ชื่อภาษาอังกฤษ")]
        public string NameEN { get; set; }
        [Display(Name = "สถานะ")]
        public string Status { get; set; }
        [Display(Name = "โรงเรียน/มหาวิทยาลัย")]
        public string Affiliation { get; set; }
        [Display(Name = "คณะ - สาขา")]
        public string Faculty { get; set; }
        [Display(Name = "รหัสประจำตัวนักศึกษา")]
        public string KKUStudentID { get; set; }
        public bool RegisterROV { get; set; }
        [Display(Name = "ทีม ROV")]
        public string ROVTeam { get; set; }
        public bool RegisterCosplay { get; set; }
        [Display(Name = "ชื่อเล่น Cosplayer")]
        public string Nickname { get; set; }
        [Display(Name = "ตัวละคร - เรื่อง")]
        public string RefCharacter { get; set; }
        public bool RegisterMovie { get; set; }
        [Display(Name = "ทีม Movie")]
        public string MovieTeam { get; set; }
        public bool RegisterPoster { get; set; }
        [Display(Name = "ทีม Poster")]
        public string PosterTeam { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? DeleteDate { get; set; }
        [Display(Name = "9 มีนาคม")]
        public DateTime? FirstDate { get; set; }
        [Display(Name = "10 มีนาคม")]
        public DateTime? SecondDate { get; set; }
        [Display(Name = "11 มีนาคม")]
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
