const getPaginatedData = async (model, options) => {
  const page = options.page || 1
  const limit = options.limit || 10
  const skip = (page - 1) * limit
  const endIndex = page * limit

  const count = await model.countDocuments(options.filters || {})
  const totalPages = Math.ceil(count / limit)
  let next, previous

  const data = await model
    .find(options.filters || {})
    .sort(options.sort || {})
    .skip(skip)
    .limit(limit)
    .populate(options.populate || [])

  if (endIndex < totalPages) {
    next = {
      page: page + 1,
      limit: limit,
    }
  }

  if (skip > 0) {
    previous = {
      page: page - 1,
      limit: limit,
    }
  }

  return {
    currentPage: +page,
    next,
    previous,
    totalPages,
    data,
  }
}

module.exports = getPaginatedData
