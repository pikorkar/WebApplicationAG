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

        [HttpGet("userstory/{id}")]
        public IActionResult GetAllByUserStory(int id)
        {
            var model = _engineeringTaskService.GetAllByUserStory(id);

            if (model == null)
                return NotFound();

            return Ok(model);
        }

    }
}