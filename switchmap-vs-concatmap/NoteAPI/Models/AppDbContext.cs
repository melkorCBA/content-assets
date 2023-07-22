using Microsoft.EntityFrameworkCore;

namespace NoteAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>().HasData(new Note { Id = 2, Content = "some conctent"});
        }

        public DbSet<Note> Notes { get; set;}

        public async Task SeedData()
        {
            Notes.Add(new Note { Id = 2, Content = "some conctent" });
            await SaveChangesAsync();

        }
    }
}
