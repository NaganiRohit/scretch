/**
 * @type {{ ADMIN: "ADMIN"; USER: "USER"} as const}
 */
const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const AvailableUserRoles = Object.values(UserRolesEnum);

/**
 * @type {{ PENDING: "PENDING"; CANCELLED: "CANCELLED"; DELIVERED: "DELIVERED" } as const}
 */
const OrderStatusEnum = {
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED",
};

const AvailableOrderStatuses = Object.values(OrderStatusEnum);

/**
 * @type {{ UNKNOWN:"UNKNOWN"; RAZORPAY: "RAZORPAY"; PAYPAL: "PAYPAL"; } as const}
 */
const PaymentProviderEnum = {
  UNKNOWN: "UNKNOWN",
  RAZORPAY: "RAZORPAY",
  PAYPAL: "PAYPAL",
};

const AvailablePaymentProviders = Object.values(PaymentProviderEnum);

/**
 * @type {{ FLAT:"FLAT"; } as const}
 */
const CouponTypeEnum = {
  FLAT: "FLAT",
  // PERCENTAGE: "PERCENTAGE",
};

const AvailableCouponTypes = Object.values(CouponTypeEnum);

/**
 * @type {{ GOOGLE: "GOOGLE"; GITHUB: "GITHUB"; EMAIL_PASSWORD: "EMAIL_PASSWORD"} as const}
 */
const UserLoginType = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
};

const AvailableSocialLogins = Object.values(UserLoginType);

/**
 * @type {{ MOST_VIEWED: "mostViewed"; MOST_LIKED: "mostLiked"; LATEST: "latest"; OLDEST: "oldest"} as const}
 */
const YouTubeFilterEnum = {
  MOST_VIEWED: "mostViewed",
  MOST_LIKED: "mostLiked",
  LATEST: "latest",
  OLDEST: "oldest",
};

const AvailableYouTubeFilters = Object.values(YouTubeFilterEnum);

const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes

const MAXIMUM_SUB_IMAGE_COUNT = 4;
const MAXIMUM_SOCIAL_POST_IMAGE_COUNT = 6;

const DB_NAME = "freeapi";

const paypalBaseUrl = {
  sandbox: "https://api-m.sandbox.paypal.com",
};

/**
 * @description set of events that we are using in chat app. more to be added as we develop the chat app
 */
const ChatEventEnum = Object.freeze({
  // ? once user is ready to go
  CONNECTED_EVENT: "connected",
  // ? when user gets disconnected
  DISCONNECT_EVENT: "disconnect",
  // ? when user joins a socket room
  JOIN_CHAT_EVENT: "joinChat",
  // ? when participant gets removed from group, chat gets deleted or leaves a group
  LEAVE_CHAT_EVENT: "leaveChat",
  // ? when admin updates a group name
  UPDATE_GROUP_NAME_EVENT: "updateGroupName",
  // ? when new message is received
  MESSAGE_RECEIVED_EVENT: "messageReceived",
  // ? when there is new one on one chat, new group chat or user gets added in the group
  NEW_CHAT_EVENT: "newChat",
  // ? when there is an error in socket
  SOCKET_ERROR_EVENT: "socketError",
  // ? when participant stops typing
  STOP_TYPING_EVENT: "stopTyping",
  // ? when participant starts typing
  TYPING_EVENT: "typing",
  // ? when message is deleted
  MESSAGE_DELETE_EVENT: "messageDeleted",
});

const AvailableChatEvents = Object.values(ChatEventEnum);

module.exports = {
  UserRolesEnum,
  AvailableUserRoles,
  OrderStatusEnum,
  AvailableOrderStatuses,
  PaymentProviderEnum,
  AvailablePaymentProviders,
  CouponTypeEnum,
  AvailableCouponTypes,
  UserLoginType,
  AvailableSocialLogins,
  YouTubeFilterEnum,
  AvailableYouTubeFilters,
  USER_TEMPORARY_TOKEN_EXPIRY,
  MAXIMUM_SUB_IMAGE_COUNT,
  MAXIMUM_SOCIAL_POST_IMAGE_COUNT,
  DB_NAME,
  paypalBaseUrl,
  ChatEventEnum,
  AvailableChatEvents,
};
