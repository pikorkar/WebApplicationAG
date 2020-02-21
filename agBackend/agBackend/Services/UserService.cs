﻿using System;
using System.Collections.Generic;
using System.Linq;
using agBackend.Entities;
using agBackend.Helpers;

namespace agBackend.Services
{
    public interface IUserService {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
        // old
        //private List<User> _users = new List<User>
        //{ 
           
        //    new User { Id = 2, FirstName = "Normal", LastName = "User", Username = "user", Password = "user", Role = Role.User } ,
        //     new User { Id = 1, FirstName = "Admin", LastName = "User", Username = "admin", Password = "admin", Role = Role.Admin },
        //};

        //private readonly AppSettings _appSettings;
        // end old

        private DataContext _context;

        public UserService(DataContext context) {
            _context = context;
        }

        //public UserService(IOptions<AppSettings> appSettings) {
        //    _appSettings = appSettings.Value;
        //}

        public User Authenticate(string username, string password) {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Username == username);


            //var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

            // user not found
            if (user == null) {
                return null;
            }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            //return user.WithoutPassword();
            return user;
        }

        public IEnumerable<User> GetAll() {
            return _context.Users;
            //return _users.WithoutPasswords();      
        }

        public User GetById(int id) {
            return _context.Users.Find(id);
            //var user = _users.FirstOrDefault(x => x.Id == id);
            //return user.WithoutPassword();
        }

        public User Create(User user, string password) {
            if (string.IsNullOrEmpty(password)) {
                throw new AppException("Password is required.");
            }

            if (_context.Users.Any(x => x.Username == user.Username)) {
                throw new AppException("Username " + user.Username + "is already taken.");
            }

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void Update(User userParam, string password = null) {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found.");

            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username) {
                if (_context.Users.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + user.Username + "is already taken.");

                user.Username = userParam.Username;
            }

            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            if (!string.IsNullOrWhiteSpace(password)) {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id) {
            var user = _context.Users.Find(id);
            if (user != null) {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
            if (password == null)
                throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt) {
            if (password == null)
                throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) 
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt)) {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++) {
                    if (computedHash[i] != storedHash[i])
                        return false;
                }
            }
            return true;      
        }
    }
}
