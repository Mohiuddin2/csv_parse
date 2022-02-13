// exports.login = asyncHandler(async (req, res, next) => {
//     const { email, password } = req.body;
//     // Validate email & password
//     if (!email || !password) {
//       return next(new ErrorResponse("Please Input credentials", 400));
//     }
//     // Check for user
//     const user = await User.findOne({ email }).select("+password");
  
//     if (!user) {
//      return next(new ErrorResponse("Email or Password is not valid", 401));
//     }
  
//     // check for Password matches
//     const isMatch = await user.matchPassword(password);
  
//     if (!isMatch) {
//       next(new ErrorResponse("Email or Password is not valid", 401));
//     }
//     sendTokenResponse(user, 200, res);
//   });

let arr = [
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: 12.2 },
  { },
  { id: null },
  { id: NaN },
  { id: 'undefined' }
]

let invalidEntries = 0

function filterByID(item) {
  if (Number.isFinite(item.id) && item.id !== 0) {
    return true
  }
  invalidEntries++
  return false;
}

let arrByID = arr.filter(filterByID)

console.log('Filtered Array\n', arrByID)
// Filtered Array
// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

console.log('Number of Invalid Entries = ', invalidEntries)
// Number of Invalid Entries = 5