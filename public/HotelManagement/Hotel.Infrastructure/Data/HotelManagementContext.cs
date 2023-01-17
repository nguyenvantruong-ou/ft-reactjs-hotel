using System;
using System.Collections.Generic;
using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Feedbacks.Entities;
using Hotel.Domain.Orders.Entities;
using Hotel.Domain.Rooms.Entities;
using Hotel.Domain.Services.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Hotel.Infrastructure.Data
{
    public partial class HotelManagementContext : DbContext
    {
        public HotelManagementContext()
        {
        }

        public HotelManagementContext(DbContextOptions<HotelManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Bill> Bills { get; set; } = null!;
        public virtual DbSet<Capita> Capita { get; set; } = null!;
        public virtual DbSet<Coefficient> Coefficients { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<Image> Images { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderRoom> OrderRooms { get; set; } = null!;
        public virtual DbSet<OrderService> OrderServices { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Room> Rooms { get; set; } = null!;
        public virtual DbSet<Service> Services { get; set; } = null!;
        public virtual DbSet<StaffType> StaffTypes { get; set; } = null!;
        public virtual DbSet<Staff> staff { get; set; } = null!;
        public virtual DbSet<TokenRegister> TokenRegisters { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=HotelManagement;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.HasIndex(e => e.CardId, "UQ__Account__4D5BC49032B3A31C")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__Account__AB6E61642BC11F21")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");

                entity.Property(e => e.Avatar)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("avatar");

                entity.Property(e => e.CardId)
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .HasColumnName("cardId")
                    .IsFixedLength();

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreated")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .HasColumnName("firstName");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .HasColumnName("gender");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .HasColumnName("lastName");

                entity.Property(e => e.Password)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("phoneNumber")
                    .IsFixedLength();

                entity.Property(e => e.RoleId).HasColumnName("roleId");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Account__roleId__29572725");
            });

            modelBuilder.Entity<TokenRegister>(entity =>
            {
                entity.HasKey(e => e.Email)
                    .HasName("PK__TokenReg__AB6E616571116DDF");

                entity.ToTable("TokenRegister");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Token)
                    .HasMaxLength(1200)
                    .IsUnicode(false)
                    .HasColumnName("token");

                entity.HasOne(d => d.EmailNavigation)
                    .WithOne(p => p.TokenRegister)
                    .HasPrincipalKey<Account>(p => p.Email)
                    .HasForeignKey<TokenRegister>(d => d.Email)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TokenRegi__email__0E6E26BF");
            });

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Bill");

                entity.HasIndex(e => e.Id, "UQ__Bill__3213E83ECD1296C9")
                    .IsUnique();

                entity.Property(e => e.CostsIncurred)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("costsIncurred")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreated")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.StaffId).HasColumnName("staffId");

                entity.Property(e => e.TotalMoney)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("totalMoney");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne()
                    .HasForeignKey<Bill>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bill__id__5EBF139D");

                entity.HasOne(d => d.Staff)
                    .WithMany()
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK__Bill__staffId__60A75C0F");
            });

            modelBuilder.Entity<Capita>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AmountOfPeople)
                    .HasMaxLength(30)
                    .HasColumnName("amountOfPeople");

                entity.Property(e => e.Value).HasColumnName("value");
            });

            modelBuilder.Entity<Coefficient>(entity =>
            {
                entity.ToTable("Coefficient");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .HasColumnName("name");

                entity.Property(e => e.Value).HasColumnName("value");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Content)
                    .HasMaxLength(500)
                    .HasColumnName("content");

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreated")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Incognito)
                    .HasColumnName("incognito")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.ParentId)
                    .HasColumnName("parentId")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.RoomId).HasColumnName("roomId");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK__Comment__account__45F365D3");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.RoomId)
                    .HasConstraintName("FK__Comment__roomId__46E78A0C");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("Feedback");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Content)
                    .HasMaxLength(2000)
                    .HasColumnName("content");

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreated")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsRead)
                    .HasColumnName("isRead")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK__Feedback__accoun__34C8D9D1");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.ToTable("Image");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Link)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("link");

                entity.Property(e => e.RoomId).HasColumnName("roomId");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.RoomId)
                    .HasConstraintName("FK__Image__roomId__4222D4EF");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.CapitaId).HasColumnName("capitaId");

                entity.Property(e => e.CoefficientId).HasColumnName("coefficientId");

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreated")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsPay)
                    .HasColumnName("isPay")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK__Order__accountId__4CA06362");

                entity.HasOne(d => d.Capita)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CapitaId)
                    .HasConstraintName("FK__Order__capitaId__4E88ABD4");

                entity.HasOne(d => d.Coefficient)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CoefficientId)
                    .HasConstraintName("FK__Order__coefficie__4D94879B");
            });

            modelBuilder.Entity<OrderRoom>(entity =>
            {
                entity.ToTable("OrderRoom");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.OrderId).HasColumnName("orderId");

                entity.Property(e => e.RoomId).HasColumnName("roomId");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderRooms)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__OrderRoom__order__5535A963");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.OrderRooms)
                    .HasForeignKey(d => d.RoomId)
                    .HasConstraintName("FK__OrderRoom__roomI__5441852A");
            });

            modelBuilder.Entity<OrderService>(entity =>
            {
                entity.ToTable("OrderService");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.OrderId).HasColumnName("orderId");

                entity.Property(e => e.ServiceId).HasColumnName("serviceId");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderServices)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__OrderServ__order__5BE2A6F2");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.OrderServices)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK__OrderServ__servi__5AEE82B9");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(50)
                    .HasColumnName("roleName");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("Room");

                entity.HasIndex(e => e.Slug, "UQ__Room__32DD1E4CC102FE82")
                    .IsUnique();

                entity.HasIndex(e => e.RoomName, "UQ__Room__E8CC772D082F639C")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Acreage)
                    .HasMaxLength(100)
                    .HasColumnName("acreage");

                entity.Property(e => e.BedType)
                    .HasMaxLength(100)
                    .HasColumnName("bedType");

                entity.Property(e => e.Description)
                    .HasMaxLength(3000)
                    .HasColumnName("description");

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("price");

                entity.Property(e => e.RoomName)
                    .HasMaxLength(100)
                    .HasColumnName("roomName");

                entity.Property(e => e.Slug)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("slug");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.ToTable("Service");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("price");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Image)
                    .HasMaxLength(300)
                    .HasColumnName("image");
            });

            modelBuilder.Entity<StaffType>(entity =>
            {
                entity.ToTable("StaffType");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Type)
                    .HasMaxLength(30)
                    .HasColumnName("type");
            });

            modelBuilder.Entity<Staff>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Staff");

                entity.HasIndex(e => e.Id, "UQ__Staff__3213E83E771E0223")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Salary)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("salary");

                entity.Property(e => e.StatusStaff)
                    .HasColumnName("statusStaff")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.TypeId).HasColumnName("typeId");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne()
                    .HasForeignKey<Staff>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Staff__id__6477ECF3");

                entity.HasOne(d => d.Type)
                    .WithMany()
                    .HasForeignKey(d => d.TypeId)
                    .HasConstraintName("FK__Staff__typeId__656C112C");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
