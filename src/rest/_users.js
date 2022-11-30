const Router = require('@koa/router');
const userService = require('../service/user');

const getUser = async(ctx) => {
    ctx.body = await userService.getUserById(ctx.params.id);
};

const createUser = async(ctx) => {
    ctx.body = await userService.createUser(ctx.request.body);
    ctx.status = 201;
};

const updateUser = async(ctx) => {
    ctx.body = await userService.updateUserById(ctx.params.id, ctx.request.body);

};

const deleteUser = async(ctx) => {
    ctx.body = await userService.deleteUserById(ctx.params.id);
    ctx.status = 204;
};

const getAllUsers = async(ctx) => {
    ctx.body = await userService.getAllUsers();
};
const getKledingstukkenByUserId = async(ctx) => {
    ctx.body = await userService.getAllKledingstukkenOfUserById(ctx.params.id);
};
const getAllKleerkastenOfUserById = async(ctx) => {
    ctx.body = await userService.getAllKleerkastenOfUserById(ctx.params.id);
};
module.exports = (app) => {
    const router = new Router({ prefix: '/users'});
    router.get('/', getAllUsers);
    router.get('/:id', getUser);
    router.post('/', createUser);
    router.put('/:id', updateUser);
    router.delete('/:id', deleteUser);
    router.get('/:id/kledingstukken', getKledingstukkenByUserId);
    router.get('/:id/kleerkasten', getAllKleerkastenOfUserById);
    app.use(router.routes()).use(router.allowedMethods());
}

