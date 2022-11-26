import prisma from "../modules/db";

//get one update points
export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id,
        },
    });
    res.json({ data: update });
};

// get all update points
export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            id: req.user.id,
        },
        include: {
            updates: true,
        },
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);
    res.json({ data: updates });
};

// create update
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId,
        },
    });

    if (!product) {
        // does not belong to user
        return res.json({ message: "nope" });
    }

    const update = await prisma.update.create({
        data: req.body,
    });

    res.json({ data: update });
};

// update product
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
        return res.json({ message: "nope" });
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });

    res.json({ data: updateUpdate });
};

// delete product
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
        return res.json({ message: "nope" });
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id,
        },
    });

    res.json({ data: deleted });
};
