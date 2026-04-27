import { IUser, User } from "./user.model";

export const UserReposiroty = {
  /**
   * Create a new user
   */
  create: async (data: Partial<IUser>) => {
    return await User.create(data);
  },
  /**
   * Find user by email
   */
  findByEmail: async (email: string) => {
    return await User.findOne({ email });
  },
  /**
   * Find user by Id
   */
  findById: async (userId: string) => {
    return await User.findById(userId);
  },
  /**
   * Update refresh token hash + expiry
   */
  updateRefreshToken: async (
    userId: string,
    refreshTokenHash: string | undefined,
    refreshTokenExpiresAt: Date | undefined,
  ) => {
    return await User.findByIdAndUpdate(
      userId,
      {
        refreshTokenHash,
        refreshTokenExpiresAt,
      },
      { returnDocument: "after" },
    );
  },
  /**
   * Paginated list of users
   */
  finAllPaginated: async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      await User.find({}, "-password -refreshTokenHash -refreshTokenExpiresAt")
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
  /**
   * TODO - findbyOrg
   */
  findByOrganizationId: async (orgId: string): Promise<void> => {},
};
