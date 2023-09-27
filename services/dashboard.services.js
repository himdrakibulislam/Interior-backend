const Contact = require("../modles/contact");

exports.getContactServices = async () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const result = await Contact.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
          $lt: new Date(`${currentYear}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return result;
};
exports.getContactTotalServices = async () => {
  const result = await Contact.aggregate([
    {
      $group: {
        _id: null,
        totalBudget: { $sum: "$budget" },
        budgetAverage: { $avg: "$budget" },
      },
    },
  ]);

  return result;
};
