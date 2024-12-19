const UserServices = require("../services/UserServices")
const JwtService = require('../services/JwtServices')



const createUser = async (req, res) => {
      try {

            const { email, password, confirmPassword } = req.body
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            const isCheckEmail = reg.test(email);
            // console.log('isCheckEmail', isCheckEmail);

            if (!email || !password || !confirmPassword) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: "All input fields are required"
                  });
            } else if (!isCheckEmail) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: "Invalid email format"
                  });
            } else if (password !== confirmPassword) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: "Password and confirm password do not match"
                  });
            }

            const result = await UserServices.createUser(req.body);
            return res.status(200).json(result);
      }
      catch (e) {
            return res.status(404).json(
                  { message: e }
            );
      }
};

const loginUser = async (req, res) => {
      try {

            const { email, password } = req.body
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            const isCheckEmail = reg.test(email);
            // console.log('isCheckEmail', isCheckEmail);

            if (!email || !password) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: "All input fields are required"
                  });
            } else if (!isCheckEmail) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: "Invalid email format"
                  });
            }
            const result = await UserServices.loginUser(req.body);
            const { refresh_token, ...newReponse } = result
            res.cookie('refresh_token', refresh_token, {
                  httpOnly: true,
                  secure: false,
                  sameSite: 'strict',
                  path: '/',
            })
            return res.status(200).json(newReponse);
      }
      catch (e) {
            return res.status(404).json(
                  { message: e }
            );
      }
};

const updateUser = async (req, res) => {
      try {

            const userID = req.params.id;
            const data = req.body;
            if (!userID) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: "the userID is required "
                  });
            }
            const result = await UserServices.updateUser(userID, data);
            return res.status(200).json(result);
      }
      catch (e) {
            return res.status(404).json(
                  { message: e }
            );
      }
};

const deleteUser = async (req, res) => {
      try {
            const userId = req.params.id

            if (!userId) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: 'The userId is required'
                  })
            }
            const response = await UserServices.deleteUser(userId)
            return res.status(200).json(response)
      } catch (e) {
            return res.status(404).json({
                  message: e
            })
      }
};

const getAllUser = async (req, res) => {
      try {
            const response = await UserServices.getAllUser()
            return res.status(200).json(response)
      } catch (e) {
            return res.status(404).json({
                  message: e
            })
      }
}

const getDetailsUser = async (req, res) => {
      try {
            const userId = req.params.id
            if (!userId) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: 'The userId is required'
                  })
            }
            const response = await UserServices.getDetailsUser(userId)
            return res.status(200).json(response)
      } catch (e) {
            return res.status(404).json({
                  message: e
            })
      }
};

const refreshToken = async (req, res) => {
      try {
            const token = req.cookies.refresh_token
            if (!token) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: 'The token is required'
                  })
            }
            const response = await JwtService.refreshTokenJwtService(token)
            return res.status(200).json(response)
      } catch (e) {
            return res.status(404).json({
                  message: e
            })
      }
};

const deleteMany = async (req, res) => {
      try {
            const ids = req.body.ids
            if (!ids) {
                  return res.status(200).json({
                        status: 'ERR',
                        message: 'The ids is required'
                  })
            }
            const response = await UserService.deleteManyUser(ids)
            return res.status(200).json(response)
      } catch (e) {
            return res.status(404).json({
                  message: e
            })
      }
};
const logoutUser = async (req, res) => {
      try {
            res.clearCookie('refresh_token')
            return res.status(200).json({
                  status: 'OK',
                  message: 'Logout successfully'
            })
      } catch (e) {
            return res.status(404).json({
                  message: e
            })
      }
};

module.exports = {
      createUser,
      loginUser,
      updateUser,
      deleteUser,
      getAllUser,
      getDetailsUser,
      refreshToken,
      deleteMany,
      logoutUser
};