import { addFollower, getIsFollowingDB, removeFollower } from "../repositories/followers.repository.js";
import { getUserLikesDB, getUserPhotoDB, getUsersBySearchTextDB } from "../repositories/user.repository.js";

export async function getUsersBySearchText(req, res) {
    const { id } = req.tokenData;
    const { searchText } = req.body
    try {
        const users = await getUsersBySearchTextDB(id, searchText)
        res.send(users.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUserProfilePhoto(req, res) {
    try {
        const { id } = req.tokenData
        const avatar = await getUserPhotoDB(id)
        res.send(avatar.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export async function getUserPhoto(req, res) {
    try {
        const { id } = req.params
        const avatar = await getUserPhotoDB(id)
        res.send(avatar.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export async function getUserLikes(req, res) {
    try {
        const { id } = req.tokenData
        const likes = await getUserLikesDB(id)
        res.send(likes.rows)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function toggleFollow(req, res) {
    try {
        const { id: userOwnerID } = req.tokenData
        const { isFollowed } = req.body
        const { id: userToSetFollow } = req.params
        if (typeof isFollowed !== 'boolean') return res.status(422).send()

        if (isFollowed) {
            await removeFollower(userOwnerID, userToSetFollow)
        } else {
            await addFollower(userOwnerID, userToSetFollow)
        }
        res.send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}
export async function getIsFollowing(req, res) {
    try {
        const { id: userOwnerID } = req.tokenData
        const { id: isFollowedID } = req.params
        const { rowCount } = await getIsFollowingDB(userOwnerID, isFollowedID)
        res.send(rowCount > 0)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}

