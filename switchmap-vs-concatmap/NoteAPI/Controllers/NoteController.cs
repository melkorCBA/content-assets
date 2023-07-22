using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteAPI.Models;

namespace NoteAPI.Controllers
{
    [Route("notes")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public NoteController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
          
        }

        [HttpGet("{noteId}")]
        public async Task<ActionResult<Note>> GetNote(int noteId, CancellationToken cancellationToken)
        {
            var note = await _appDbContext.Notes.FindAsync(noteId, cancellationToken);
            return Ok(note);
        }

        [HttpPut("{noteId}")]
        public async Task<ActionResult<Note>> UpdateNote(int noteId, [FromBody] NoteViewModel noteViewModel,  CancellationToken cancellationToken)
        {
            await Task.Delay(2000);
            var headers = Request.Headers;
            var note = await _appDbContext.Notes.FindAsync(noteId, cancellationToken);
            note.Content = noteViewModel.content;
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return Ok(note);
            

        }

        public class NoteViewModel
        {
            public string content { get; set; }
        }


    }
}
