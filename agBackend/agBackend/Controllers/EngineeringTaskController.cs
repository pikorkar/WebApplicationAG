using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using agBackend.Services;
using agBackend.Models;
using agBackend.Entities;
using AutoMapper;
using agBackend.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using System.Collections.Generic;


namespace agBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class EngineeringTaskController : ControllerBase
    {
        private IEngineeringTaskService _engineeringTaskService;
        private IMapper _mapper;

        public EngineeringTaskController(IEngineeringTaskService engineeringTaskService,
            IMapper mapper)
        {
            _engineeringTaskService = engineeringTaskService;
            _mapper = mapper;
        }

        // GET by id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var engineeringTask = _engineeringTaskService.GetById(id);

            if (engineeringTask == null)
                return NotFound();

            return Ok(engineeringTask);
        }

        // GET all in User Story
        [HttpGet("userstory/{id}")]
        public IActionResult GetAllByUserStory(int id)
        {
            var model = _engineeringTaskService.GetAllByUserStory(id);

            if (model == null)
                return NotFound();

            return Ok(model);
        }

        // Create
        [HttpPost("create")]
        public IActionResult Create([FromBody]EngineeringTaskCreateModel model)
        {
            var engineeringTask = _mapper.Map<EngineeringTaskModel>(model);

            try
            {
                _engineeringTaskService.Create(engineeringTask);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Update
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]EngineeringTaskUpdateModel model)
        {
            var engineeringTaskModel = _mapper.Map<EngineeringTaskModel>(model);
            engineeringTaskModel.Id = id;

            try
            {
                _engineeringTaskService.Update(engineeringTaskModel);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        
        // Delete
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _engineeringTaskService.Delete(id);
            return Ok();
        }
    }
}