    using System;
    using Microsoft.EntityFrameworkCore;
    using API.Entities;
    using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
    namespace API.Data;

    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var dateTimeConvertor = new ValueConverter<DateTime, DateTime>(
                d => d.ToUniversalTime(),
                d => DateTime.SpecifyKind(d,DateTimeKind.Utc)
            );

            foreach(var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach(var property in entityType.GetProperties())
                {
                    if(property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(dateTimeConvertor);
                    }
                }
            }
        }
    }
