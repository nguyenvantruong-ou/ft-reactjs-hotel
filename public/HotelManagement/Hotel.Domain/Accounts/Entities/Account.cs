using System;
using System.Collections.Generic;
using Hotel.Domain.Feedbacks.Entities;
using Hotel.Domain.Rooms.Entities;
using Hotel.Domain.Orders.Entities;

namespace Hotel.Domain.Accounts.Entities
{
    public partial class Account
    {
        public Account()
        {
            Comments = new HashSet<Comment>();
            Feedbacks = new HashSet<Feedback>();
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int? RoleId { get; set; }
        public string? Gender { get; set; }
        public string? Avatar { get; set; }
        public string CardId { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? Address { get; set; }
        public bool? Status { get; set; }
        public DateTime? DateCreated { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual TokenRegister? TokenRegister { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
