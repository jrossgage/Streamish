using Microsoft.AspNetCore.Mvc;
using Streamish.Controllers;
using Streamish.Models;
using Streamish.Tests.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Streamish.Tests
{
    public class UserProfileControllerTests
    {
        [Fact]
        public void Get_Returns_All_Users()
        {
            //Arrange
            var userCount = 20;
            var users = CreateTestUsers(userCount);

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            var result = controller.Get();

            //Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUsers = Assert.IsType<List<UserProfile>>(okResult.Value);

            Assert.Equal(userCount, actualUsers.Count);
            Assert.Equal(users, actualUsers);
        }

        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unkown_id()
        {
            //Arrange
            var users = new List<UserProfile>();

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            var result = controller.Get(1);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Get_By_Id_Returns_User_With_Given_Id()
        {
            //Arrange
            var testUserId = 99;
            var users = CreateTestUsers(5);
            users[0].Id = testUserId;

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            var result = controller.Get(testUserId);

            //Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUser = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testUserId, actualUser.Id);
        }

        [Fact]
        public void Post_Method_Adds_A_New_User()
        {
            //Arrange
            var userCount = 20;
            var users = CreateTestUsers(userCount);

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            var newUser = new UserProfile()
            {
                Name = "Name",
                Email = "Email",
                ImageUrl = "Image",
                DateCreated = DateTime.Today,

            };

            controller.Post(newUser);

            //Assert
            Assert.Equal(userCount + 1, repo.InternalData.Count);
        }

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Do_Not_Match()
        {
            //Arrange
            var testUserId = 99;
            var users = CreateTestUsers(5);
            users[0].Id = testUserId;

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            var UserToUpdate = new UserProfile()
            {
                Id = testUserId,
                Name = "Name",
                Email = "Email",
                ImageUrl = "Image",
                DateCreated = DateTime.Today,
            };
            var someOtherUserId = testUserId + 1;

            //Act
            var result = controller.Put(someOtherUserId, UserToUpdate);

            //Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void Put_Method_Updates_A_User()
        {
            //Arrange
            var testUserId = 99;
            var users = CreateTestUsers(5);
            users[0].Id = testUserId;

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            var UserToUpdate = new UserProfile()
            {
                Id = testUserId,
                Name = "Name",
                Email = "Email",
                ImageUrl = "Image",
                DateCreated = DateTime.Today,
            };

            //Act
            controller.Put(testUserId, UserToUpdate);

            //Assert
            var userFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testUserId);
            Assert.NotNull(userFromDb);

            Assert.Equal(UserToUpdate.Name, userFromDb.Name);
            Assert.Equal(UserToUpdate.Email, userFromDb.Email);
            Assert.Equal(UserToUpdate.ImageUrl, userFromDb.ImageUrl);
            Assert.Equal(UserToUpdate.DateCreated, userFromDb.DateCreated);
        }

        [Fact]
        public void Delete_Method_Removes_A_User()
        {
            //Arrange
            var testUserId = 99;
            var users = CreateTestUsers(5);
            users[0].Id = testUserId;

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            controller.Delete(testUserId);

            //Assert
            var userFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testUserId);
            Assert.Null(userFromDb);
        }

        private List<UserProfile> CreateTestUsers(int count)
        {
            var users = new List<UserProfile>();
            for(var i = 1; i <= count; i++)
            {
                users.Add(new UserProfile()
                {
                    Id = i,
                    Name = $"Name {i}",
                    Email = $"Email {i}",
                    ImageUrl = $"Image {i}",
                    DateCreated = DateTime.Today.AddDays(-i),
                });
            }
            return users;
        }

        private UserProfile CreateTestUserProfile(int id)
        {
            return new UserProfile()
            {
                Id = id,
                Name = $"User {id}",
                Email = $"user{id}@example.com",
                DateCreated = DateTime.Today.AddDays(-id),
                ImageUrl = $"http://user.url/{id}",
            };
        }
    }
}
