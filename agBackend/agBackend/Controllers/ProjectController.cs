using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using agBackend.Services;
using AutoMapper;
using agBackend.Models;
using agBackend.Helpers;

namespace agBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private IProjectService _projectService;
        private IMapper _mapper;

        public ProjectController(IProjectService projectService,
            IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var model = _projectService.GetAll();
            return Ok(model);
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]ProjectCreateModel model)
        {
            try
            {
                _projectService.Create(model);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var project = _projectService.GetById(id);

            if (project == null)
                return NotFound();

            return Ok(project);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectService.Delete(id);
            return Ok();
        }
    }
}