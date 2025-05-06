/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/whirlpool.json`.
 */
export type Whirlpool = {
  "address": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
  "metadata": {
    "name": "whirlpool",
    "version": "0.3.4",
    "spec": "0.1.0"
  },
  "instructions": [
    {
      "name": "initializeConfig",
      "discriminator": [
        208,
        127,
        21,
        1,
        194,
        190,
        196,
        70
      ],
      "accounts": [
        {
          "name": "config",
          "writable": true,
          "signer": true
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "feeAuthority",
          "type": "pubkey"
        },
        {
          "name": "collectProtocolFeesAuthority",
          "type": "pubkey"
        },
        {
          "name": "rewardEmissionsSuperAuthority",
          "type": "pubkey"
        },
        {
          "name": "defaultProtocolFeeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "initializePool",
      "discriminator": [
        95,
        180,
        10,
        172,
        84,
        174,
        232,
        40
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "tokenMintA"
        },
        {
          "name": "tokenMintB"
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenVaultB",
          "writable": true,
          "signer": true
        },
        {
          "name": "feeTier"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": {
              "name": "whirlpoolBumps"
            }
          }
        },
        {
          "name": "tickSpacing",
          "type": "u16"
        },
        {
          "name": "initialSqrtPrice",
          "type": "u128"
        }
      ]
    },
    {
      "name": "initializeTickArray",
      "discriminator": [
        11,
        188,
        193,
        214,
        141,
        91,
        149,
        184
      ],
      "accounts": [
        {
          "name": "whirlpool"
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "tickArray",
          "writable": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "startTickIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "initializeFeeTier",
      "discriminator": [
        183,
        74,
        156,
        160,
        112,
        2,
        42,
        30
      ],
      "accounts": [
        {
          "name": "config"
        },
        {
          "name": "feeTier",
          "writable": true
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "feeAuthority",
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "tickSpacing",
          "type": "u16"
        },
        {
          "name": "defaultFeeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "initializeReward",
      "discriminator": [
        95,
        135,
        192,
        196,
        242,
        129,
        230,
        68
      ],
      "accounts": [
        {
          "name": "rewardAuthority",
          "signer": true
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "rewardMint"
        },
        {
          "name": "rewardVault",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setRewardEmissions",
      "discriminator": [
        13,
        197,
        86,
        168,
        109,
        176,
        27,
        244
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "rewardAuthority",
          "signer": true
        },
        {
          "name": "rewardVault"
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        },
        {
          "name": "emissionsPerSecondX64",
          "type": "u128"
        }
      ]
    },
    {
      "name": "openPosition",
      "discriminator": [
        135,
        128,
        47,
        77,
        15,
        152,
        240,
        49
      ],
      "accounts": [
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner"
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "positionTokenAccount",
          "writable": true
        },
        {
          "name": "whirlpool"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        },
        {
          "name": "associatedTokenProgram"
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": {
              "name": "openPositionBumps"
            }
          }
        },
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "openPositionWithMetadata",
      "discriminator": [
        242,
        29,
        134,
        48,
        58,
        110,
        14,
        60
      ],
      "accounts": [
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner"
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "positionMetadataAccount",
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "writable": true
        },
        {
          "name": "whirlpool"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        },
        {
          "name": "associatedTokenProgram"
        },
        {
          "name": "metadataProgram"
        },
        {
          "name": "metadataUpdateAuth"
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": {
              "name": "openPositionWithMetadataBumps"
            }
          }
        },
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "increaseLiquidity",
      "discriminator": [
        46,
        156,
        243,
        118,
        13,
        205,
        251,
        178
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionTokenAccount"
        },
        {
          "name": "tokenOwnerAccountA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMaxA",
          "type": "u64"
        },
        {
          "name": "tokenMaxB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "decreaseLiquidity",
      "discriminator": [
        160,
        38,
        208,
        111,
        104,
        91,
        44,
        1
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionTokenAccount"
        },
        {
          "name": "tokenOwnerAccountA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMinA",
          "type": "u64"
        },
        {
          "name": "tokenMinB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFeesAndRewards",
      "discriminator": [
        154,
        230,
        250,
        13,
        236,
        209,
        75,
        223
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "tickArrayLower"
        },
        {
          "name": "tickArrayUpper"
        }
      ],
      "args": []
    },
    {
      "name": "collectFees",
      "discriminator": [
        164,
        152,
        207,
        99,
        30,
        186,
        19,
        182
      ],
      "accounts": [
        {
          "name": "whirlpool"
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionTokenAccount"
        },
        {
          "name": "tokenOwnerAccountA",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "collectReward",
      "discriminator": [
        70,
        5,
        132,
        87,
        86,
        235,
        177,
        34
      ],
      "accounts": [
        {
          "name": "whirlpool"
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionTokenAccount"
        },
        {
          "name": "rewardOwnerAccount",
          "writable": true
        },
        {
          "name": "rewardVault",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "collectProtocolFees",
      "discriminator": [
        22,
        67,
        23,
        98,
        150,
        178,
        70,
        220
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "collectProtocolFeesAuthority",
          "signer": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tokenDestinationA",
          "writable": true
        },
        {
          "name": "tokenDestinationB",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "swap",
      "discriminator": [
        248,
        198,
        158,
        145,
        225,
        117,
        135,
        200
      ],
      "accounts": [
        {
          "name": "tokenProgram"
        },
        {
          "name": "tokenAuthority",
          "signer": true
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountA",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArray0",
          "writable": true
        },
        {
          "name": "tickArray1",
          "writable": true
        },
        {
          "name": "tickArray2",
          "writable": true
        },
        {
          "name": "oracle"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "closePosition",
      "discriminator": [
        123,
        134,
        81,
        0,
        49,
        68,
        98,
        98
      ],
      "accounts": [
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionMint",
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "setDefaultFeeRate",
      "discriminator": [
        118,
        215,
        214,
        157,
        182,
        229,
        208,
        228
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "feeTier",
          "writable": true
        },
        {
          "name": "feeAuthority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "defaultFeeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setDefaultProtocolFeeRate",
      "discriminator": [
        107,
        205,
        249,
        226,
        151,
        35,
        86,
        0
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig",
          "writable": true
        },
        {
          "name": "feeAuthority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "defaultProtocolFeeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setFeeRate",
      "discriminator": [
        53,
        243,
        137,
        65,
        8,
        140,
        158,
        6
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "feeAuthority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "feeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setProtocolFeeRate",
      "discriminator": [
        95,
        7,
        4,
        50,
        154,
        79,
        156,
        131
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "feeAuthority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "protocolFeeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setFeeAuthority",
      "discriminator": [
        31,
        1,
        50,
        87,
        237,
        101,
        97,
        132
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig",
          "writable": true
        },
        {
          "name": "feeAuthority",
          "signer": true
        },
        {
          "name": "newFeeAuthority"
        }
      ],
      "args": []
    },
    {
      "name": "setCollectProtocolFeesAuthority",
      "discriminator": [
        34,
        150,
        93,
        244,
        139,
        225,
        233,
        67
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig",
          "writable": true
        },
        {
          "name": "collectProtocolFeesAuthority",
          "signer": true
        },
        {
          "name": "newCollectProtocolFeesAuthority"
        }
      ],
      "args": []
    },
    {
      "name": "setRewardAuthority",
      "discriminator": [
        34,
        39,
        183,
        252,
        83,
        28,
        85,
        127
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "rewardAuthority",
          "signer": true
        },
        {
          "name": "newRewardAuthority"
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setRewardAuthorityBySuperAuthority",
      "discriminator": [
        240,
        154,
        201,
        198,
        148,
        93,
        56,
        25
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "rewardEmissionsSuperAuthority",
          "signer": true
        },
        {
          "name": "newRewardAuthority"
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setRewardEmissionsSuperAuthority",
      "discriminator": [
        207,
        5,
        200,
        209,
        122,
        56,
        82,
        183
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig",
          "writable": true
        },
        {
          "name": "rewardEmissionsSuperAuthority",
          "signer": true
        },
        {
          "name": "newRewardEmissionsSuperAuthority"
        }
      ],
      "args": []
    },
    {
      "name": "twoHopSwap",
      "discriminator": [
        195,
        96,
        237,
        108,
        68,
        162,
        219,
        230
      ],
      "accounts": [
        {
          "name": "tokenProgram"
        },
        {
          "name": "tokenAuthority",
          "signer": true
        },
        {
          "name": "whirlpoolOne",
          "writable": true
        },
        {
          "name": "whirlpoolTwo",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountOneA",
          "writable": true
        },
        {
          "name": "tokenVaultOneA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountOneB",
          "writable": true
        },
        {
          "name": "tokenVaultOneB",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountTwoA",
          "writable": true
        },
        {
          "name": "tokenVaultTwoA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountTwoB",
          "writable": true
        },
        {
          "name": "tokenVaultTwoB",
          "writable": true
        },
        {
          "name": "tickArrayOne0",
          "writable": true
        },
        {
          "name": "tickArrayOne1",
          "writable": true
        },
        {
          "name": "tickArrayOne2",
          "writable": true
        },
        {
          "name": "tickArrayTwo0",
          "writable": true
        },
        {
          "name": "tickArrayTwo1",
          "writable": true
        },
        {
          "name": "tickArrayTwo2",
          "writable": true
        },
        {
          "name": "oracleOne"
        },
        {
          "name": "oracleTwo"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToBOne",
          "type": "bool"
        },
        {
          "name": "aToBTwo",
          "type": "bool"
        },
        {
          "name": "sqrtPriceLimitOne",
          "type": "u128"
        },
        {
          "name": "sqrtPriceLimitTwo",
          "type": "u128"
        }
      ]
    },
    {
      "name": "initializePositionBundle",
      "discriminator": [
        117,
        45,
        241,
        149,
        24,
        18,
        194,
        65
      ],
      "accounts": [
        {
          "name": "positionBundle",
          "writable": true
        },
        {
          "name": "positionBundleMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "positionBundleTokenAccount",
          "writable": true
        },
        {
          "name": "positionBundleOwner"
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        },
        {
          "name": "associatedTokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "initializePositionBundleWithMetadata",
      "discriminator": [
        93,
        124,
        16,
        179,
        249,
        131,
        115,
        245
      ],
      "accounts": [
        {
          "name": "positionBundle",
          "writable": true
        },
        {
          "name": "positionBundleMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "positionBundleMetadata",
          "writable": true
        },
        {
          "name": "positionBundleTokenAccount",
          "writable": true
        },
        {
          "name": "positionBundleOwner"
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "metadataUpdateAuth"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        },
        {
          "name": "associatedTokenProgram"
        },
        {
          "name": "metadataProgram"
        }
      ],
      "args": []
    },
    {
      "name": "deletePositionBundle",
      "discriminator": [
        100,
        25,
        99,
        2,
        217,
        239,
        124,
        173
      ],
      "accounts": [
        {
          "name": "positionBundle",
          "writable": true
        },
        {
          "name": "positionBundleMint",
          "writable": true
        },
        {
          "name": "positionBundleTokenAccount",
          "writable": true
        },
        {
          "name": "positionBundleOwner",
          "signer": true
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "openBundledPosition",
      "discriminator": [
        169,
        113,
        126,
        171,
        213,
        172,
        212,
        49
      ],
      "accounts": [
        {
          "name": "bundledPosition",
          "writable": true
        },
        {
          "name": "positionBundle",
          "writable": true
        },
        {
          "name": "positionBundleTokenAccount"
        },
        {
          "name": "positionBundleAuthority",
          "signer": true
        },
        {
          "name": "whirlpool"
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "bundleIndex",
          "type": "u16"
        },
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "closeBundledPosition",
      "discriminator": [
        41,
        36,
        216,
        245,
        27,
        85,
        103,
        67
      ],
      "accounts": [
        {
          "name": "bundledPosition",
          "writable": true
        },
        {
          "name": "positionBundle",
          "writable": true
        },
        {
          "name": "positionBundleTokenAccount"
        },
        {
          "name": "positionBundleAuthority",
          "signer": true
        },
        {
          "name": "receiver",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "bundleIndex",
          "type": "u16"
        }
      ]
    },
    {
      "name": "openPositionWithTokenExtensions",
      "discriminator": [
        212,
        47,
        95,
        92,
        114,
        102,
        131,
        250
      ],
      "accounts": [
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner"
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "positionTokenAccount",
          "writable": true
        },
        {
          "name": "whirlpool"
        },
        {
          "name": "token2022Program"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "associatedTokenProgram"
        },
        {
          "name": "metadataUpdateAuth"
        }
      ],
      "args": [
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        },
        {
          "name": "withTokenMetadataExtension",
          "type": "bool"
        }
      ]
    },
    {
      "name": "closePositionWithTokenExtensions",
      "discriminator": [
        1,
        182,
        135,
        59,
        155,
        25,
        99,
        223
      ],
      "accounts": [
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionMint",
          "writable": true
        },
        {
          "name": "positionTokenAccount",
          "writable": true
        },
        {
          "name": "token2022Program"
        }
      ],
      "args": []
    },
    {
      "name": "lockPosition",
      "discriminator": [
        227,
        62,
        2,
        252,
        247,
        10,
        171,
        185
      ],
      "accounts": [
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position"
        },
        {
          "name": "positionMint"
        },
        {
          "name": "positionTokenAccount",
          "writable": true
        },
        {
          "name": "lockConfig",
          "writable": true
        },
        {
          "name": "whirlpool"
        },
        {
          "name": "token2022Program"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "lockType",
          "type": {
            "defined": {
              "name": "lockType"
            }
          }
        }
      ]
    },
    {
      "name": "collectFeesV2",
      "discriminator": [
        207,
        117,
        95,
        191,
        229,
        180,
        226,
        15
      ],
      "accounts": [
        {
          "name": "whirlpool"
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionTokenAccount"
        },
        {
          "name": "tokenMintA"
        },
        {
          "name": "tokenMintB"
        },
        {
          "name": "tokenOwnerAccountA",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tokenProgramA"
        },
        {
          "name": "tokenProgramB"
        },
        {
          "name": "memoProgram"
        }
      ],
      "args": [
        {
          "name": "remainingAccountsInfo",
          "type": {
            "option": {
              "defined": {
                "name": "remainingAccountsInfo"
              }
            }
          }
        }
      ]
    },
    {
      "name": "collectProtocolFeesV2",
      "discriminator": [
        103,
        128,
        222,
        134,
        114,
        200,
        22,
        200
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "collectProtocolFeesAuthority",
          "signer": true
        },
        {
          "name": "tokenMintA"
        },
        {
          "name": "tokenMintB"
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tokenDestinationA",
          "writable": true
        },
        {
          "name": "tokenDestinationB",
          "writable": true
        },
        {
          "name": "tokenProgramA"
        },
        {
          "name": "tokenProgramB"
        },
        {
          "name": "memoProgram"
        }
      ],
      "args": [
        {
          "name": "remainingAccountsInfo",
          "type": {
            "option": {
              "defined": {
                "name": "remainingAccountsInfo"
              }
            }
          }
        }
      ]
    },
    {
      "name": "collectRewardV2",
      "discriminator": [
        177,
        107,
        37,
        180,
        160,
        19,
        49,
        209
      ],
      "accounts": [
        {
          "name": "whirlpool"
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionTokenAccount"
        },
        {
          "name": "rewardOwnerAccount",
          "writable": true
        },
        {
          "name": "rewardMint"
        },
        {
          "name": "rewardVault",
          "writable": true
        },
        {
          "name": "rewardTokenProgram"
        },
        {
          "name": "memoProgram"
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        },
        {
          "name": "remainingAccountsInfo",
          "type": {
            "option": {
              "defined": {
                "name": "remainingAccountsInfo"
              }
            }
          }
        }
      ]
    },
    {
      "name": "decreaseLiquidityV2",
      "discriminator": [
        58,
        127,
        188,
        62,
        79,
        82,
        196,
        96
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "tokenProgramA"
        },
        {
          "name": "tokenProgramB"
        },
        {
          "name": "memoProgram"
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionTokenAccount"
        },
        {
          "name": "tokenMintA"
        },
        {
          "name": "tokenMintB"
        },
        {
          "name": "tokenOwnerAccountA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMinA",
          "type": "u64"
        },
        {
          "name": "tokenMinB",
          "type": "u64"
        },
        {
          "name": "remainingAccountsInfo",
          "type": {
            "option": {
              "defined": {
                "name": "remainingAccountsInfo"
              }
            }
          }
        }
      ]
    },
    {
      "name": "increaseLiquidityV2",
      "discriminator": [
        133,
        29,
        89,
        223,
        69,
        238,
        176,
        10
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "tokenProgramA"
        },
        {
          "name": "tokenProgramB"
        },
        {
          "name": "memoProgram"
        },
        {
          "name": "positionAuthority",
          "signer": true
        },
        {
          "name": "position",
          "writable": true
        },
        {
          "name": "positionTokenAccount"
        },
        {
          "name": "tokenMintA"
        },
        {
          "name": "tokenMintB"
        },
        {
          "name": "tokenOwnerAccountA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArrayLower",
          "writable": true
        },
        {
          "name": "tickArrayUpper",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMaxA",
          "type": "u64"
        },
        {
          "name": "tokenMaxB",
          "type": "u64"
        },
        {
          "name": "remainingAccountsInfo",
          "type": {
            "option": {
              "defined": {
                "name": "remainingAccountsInfo"
              }
            }
          }
        }
      ]
    },
    {
      "name": "initializePoolV2",
      "discriminator": [
        207,
        45,
        87,
        242,
        27,
        63,
        204,
        67
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "tokenMintA"
        },
        {
          "name": "tokenMintB"
        },
        {
          "name": "tokenBadgeA"
        },
        {
          "name": "tokenBadgeB"
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenVaultB",
          "writable": true,
          "signer": true
        },
        {
          "name": "feeTier"
        },
        {
          "name": "tokenProgramA"
        },
        {
          "name": "tokenProgramB"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "tickSpacing",
          "type": "u16"
        },
        {
          "name": "initialSqrtPrice",
          "type": "u128"
        }
      ]
    },
    {
      "name": "initializeRewardV2",
      "discriminator": [
        91,
        1,
        77,
        50,
        235,
        229,
        133,
        49
      ],
      "accounts": [
        {
          "name": "rewardAuthority",
          "signer": true
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "rewardMint"
        },
        {
          "name": "rewardTokenBadge"
        },
        {
          "name": "rewardVault",
          "writable": true,
          "signer": true
        },
        {
          "name": "rewardTokenProgram"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setRewardEmissionsV2",
      "discriminator": [
        114,
        228,
        72,
        32,
        193,
        48,
        160,
        102
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "rewardAuthority",
          "signer": true
        },
        {
          "name": "rewardVault"
        }
      ],
      "args": [
        {
          "name": "rewardIndex",
          "type": "u8"
        },
        {
          "name": "emissionsPerSecondX64",
          "type": "u128"
        }
      ]
    },
    {
      "name": "swapV2",
      "discriminator": [
        43,
        4,
        237,
        11,
        26,
        201,
        30,
        98
      ],
      "accounts": [
        {
          "name": "tokenProgramA"
        },
        {
          "name": "tokenProgramB"
        },
        {
          "name": "memoProgram"
        },
        {
          "name": "tokenAuthority",
          "signer": true
        },
        {
          "name": "whirlpool",
          "writable": true
        },
        {
          "name": "tokenMintA"
        },
        {
          "name": "tokenMintB"
        },
        {
          "name": "tokenOwnerAccountA",
          "writable": true
        },
        {
          "name": "tokenVaultA",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountB",
          "writable": true
        },
        {
          "name": "tokenVaultB",
          "writable": true
        },
        {
          "name": "tickArray0",
          "writable": true
        },
        {
          "name": "tickArray1",
          "writable": true
        },
        {
          "name": "tickArray2",
          "writable": true
        },
        {
          "name": "oracle",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToB",
          "type": "bool"
        },
        {
          "name": "remainingAccountsInfo",
          "type": {
            "option": {
              "defined": {
                "name": "remainingAccountsInfo"
              }
            }
          }
        }
      ]
    },
    {
      "name": "twoHopSwapV2",
      "discriminator": [
        186,
        143,
        209,
        29,
        254,
        2,
        194,
        117
      ],
      "accounts": [
        {
          "name": "whirlpoolOne",
          "writable": true
        },
        {
          "name": "whirlpoolTwo",
          "writable": true
        },
        {
          "name": "tokenMintInput"
        },
        {
          "name": "tokenMintIntermediate"
        },
        {
          "name": "tokenMintOutput"
        },
        {
          "name": "tokenProgramInput"
        },
        {
          "name": "tokenProgramIntermediate"
        },
        {
          "name": "tokenProgramOutput"
        },
        {
          "name": "tokenOwnerAccountInput",
          "writable": true
        },
        {
          "name": "tokenVaultOneInput",
          "writable": true
        },
        {
          "name": "tokenVaultOneIntermediate",
          "writable": true
        },
        {
          "name": "tokenVaultTwoIntermediate",
          "writable": true
        },
        {
          "name": "tokenVaultTwoOutput",
          "writable": true
        },
        {
          "name": "tokenOwnerAccountOutput",
          "writable": true
        },
        {
          "name": "tokenAuthority",
          "signer": true
        },
        {
          "name": "tickArrayOne0",
          "writable": true
        },
        {
          "name": "tickArrayOne1",
          "writable": true
        },
        {
          "name": "tickArrayOne2",
          "writable": true
        },
        {
          "name": "tickArrayTwo0",
          "writable": true
        },
        {
          "name": "tickArrayTwo1",
          "writable": true
        },
        {
          "name": "tickArrayTwo2",
          "writable": true
        },
        {
          "name": "oracleOne",
          "writable": true
        },
        {
          "name": "oracleTwo",
          "writable": true
        },
        {
          "name": "memoProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToBOne",
          "type": "bool"
        },
        {
          "name": "aToBTwo",
          "type": "bool"
        },
        {
          "name": "sqrtPriceLimitOne",
          "type": "u128"
        },
        {
          "name": "sqrtPriceLimitTwo",
          "type": "u128"
        },
        {
          "name": "remainingAccountsInfo",
          "type": {
            "option": {
              "defined": {
                "name": "remainingAccountsInfo"
              }
            }
          }
        }
      ]
    },
    {
      "name": "initializeConfigExtension",
      "discriminator": [
        55,
        9,
        53,
        9,
        114,
        57,
        209,
        52
      ],
      "accounts": [
        {
          "name": "config"
        },
        {
          "name": "configExtension",
          "writable": true
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "feeAuthority",
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "setConfigExtensionAuthority",
      "discriminator": [
        44,
        94,
        241,
        116,
        24,
        188,
        60,
        143
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpoolsConfigExtension",
          "writable": true
        },
        {
          "name": "configExtensionAuthority",
          "signer": true
        },
        {
          "name": "newConfigExtensionAuthority"
        }
      ],
      "args": []
    },
    {
      "name": "setTokenBadgeAuthority",
      "discriminator": [
        207,
        202,
        4,
        32,
        205,
        79,
        13,
        178
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpoolsConfigExtension",
          "writable": true
        },
        {
          "name": "configExtensionAuthority",
          "signer": true
        },
        {
          "name": "newTokenBadgeAuthority"
        }
      ],
      "args": []
    },
    {
      "name": "initializeTokenBadge",
      "discriminator": [
        253,
        77,
        205,
        95,
        27,
        224,
        89,
        223
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpoolsConfigExtension"
        },
        {
          "name": "tokenBadgeAuthority",
          "signer": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "tokenBadge",
          "writable": true
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "deleteTokenBadge",
      "discriminator": [
        53,
        146,
        68,
        8,
        18,
        117,
        17,
        185
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig"
        },
        {
          "name": "whirlpoolsConfigExtension"
        },
        {
          "name": "tokenBadgeAuthority",
          "signer": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "tokenBadge",
          "writable": true
        },
        {
          "name": "receiver",
          "writable": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "whirlpoolsConfig",
      "discriminator": [
        157,
        20,
        49,
        224,
        217,
        87,
        193,
        254
      ]
    },
    {
      "name": "whirlpoolsConfigExtension",
      "discriminator": [
        2,
        99,
        215,
        163,
        240,
        26,
        153,
        58
      ]
    },
    {
      "name": "feeTier",
      "discriminator": [
        56,
        75,
        159,
        76,
        142,
        68,
        190,
        105
      ]
    },
    {
      "name": "lockConfig",
      "discriminator": [
        106,
        47,
        238,
        159,
        124,
        12,
        160,
        192
      ]
    },
    {
      "name": "position",
      "discriminator": [
        170,
        188,
        143,
        228,
        122,
        64,
        247,
        208
      ]
    },
    {
      "name": "positionBundle",
      "discriminator": [
        129,
        169,
        175,
        65,
        185,
        95,
        32,
        100
      ]
    },
    {
      "name": "tickArray",
      "discriminator": [
        69,
        97,
        189,
        190,
        110,
        7,
        66,
        187
      ]
    },
    {
      "name": "tokenBadge",
      "discriminator": [
        116,
        219,
        204,
        229,
        249,
        116,
        255,
        150
      ]
    },
    {
      "name": "whirlpool",
      "discriminator": [
        63,
        149,
        209,
        12,
        225,
        128,
        99,
        9
      ]
    }
  ],
  "events": [
    {
      "name": "liquidityDecreased",
      "discriminator": [
        166,
        1,
        36,
        71,
        112,
        202,
        181,
        171
      ]
    },
    {
      "name": "liquidityIncreased",
      "discriminator": [
        30,
        7,
        144,
        181,
        102,
        254,
        155,
        161
      ]
    },
    {
      "name": "poolInitialized",
      "discriminator": [
        100,
        118,
        173,
        87,
        12,
        198,
        254,
        229
      ]
    },
    {
      "name": "traded",
      "discriminator": [
        225,
        202,
        73,
        175,
        147,
        43,
        160,
        150
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidEnum",
      "msg": "Enum value could not be converted"
    },
    {
      "code": 6001,
      "name": "invalidStartTick",
      "msg": "Invalid start tick index provided."
    },
    {
      "code": 6002,
      "name": "tickArrayExistInPool",
      "msg": "Tick-array already exists in this whirlpool"
    },
    {
      "code": 6003,
      "name": "tickArrayIndexOutofBounds",
      "msg": "Attempt to search for a tick-array failed"
    },
    {
      "code": 6004,
      "name": "invalidTickSpacing",
      "msg": "Tick-spacing is not supported"
    },
    {
      "code": 6005,
      "name": "closePositionNotEmpty",
      "msg": "Position is not empty It cannot be closed"
    },
    {
      "code": 6006,
      "name": "divideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6007,
      "name": "numberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6008,
      "name": "numberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6009,
      "name": "tickNotFound",
      "msg": "Tick not found within tick array"
    },
    {
      "code": 6010,
      "name": "invalidTickIndex",
      "msg": "Provided tick index is either out of bounds or uninitializable"
    },
    {
      "code": 6011,
      "name": "sqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6012,
      "name": "liquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6013,
      "name": "liquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6014,
      "name": "liquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6015,
      "name": "liquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6016,
      "name": "liquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6017,
      "name": "tokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6018,
      "name": "tokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6019,
      "name": "missingOrInvalidDelegate",
      "msg": "Position token account has a missing or invalid delegate"
    },
    {
      "code": 6020,
      "name": "invalidPositionTokenAmount",
      "msg": "Position token amount must be 1"
    },
    {
      "code": 6021,
      "name": "invalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6022,
      "name": "invalidTimestamp",
      "msg": "Timestamp should be greater than the last updated timestamp"
    },
    {
      "code": 6023,
      "name": "invalidTickArraySequence",
      "msg": "Invalid tick array sequence provided for instruction."
    },
    {
      "code": 6024,
      "name": "invalidTokenMintOrder",
      "msg": "Token Mint in wrong order"
    },
    {
      "code": 6025,
      "name": "rewardNotInitialized",
      "msg": "Reward not initialized"
    },
    {
      "code": 6026,
      "name": "invalidRewardIndex",
      "msg": "Invalid reward index"
    },
    {
      "code": 6027,
      "name": "rewardVaultAmountInsufficient",
      "msg": "Reward vault requires amount to support emissions for at least one day"
    },
    {
      "code": 6028,
      "name": "feeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6029,
      "name": "protocolFeeRateMaxExceeded",
      "msg": "Exceeded max protocol fee rate"
    },
    {
      "code": 6030,
      "name": "multiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6031,
      "name": "mulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6032,
      "name": "mulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6033,
      "name": "multiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6034,
      "name": "invalidSqrtPriceLimitDirection",
      "msg": "Provided SqrtPriceLimit not in the same direction as the swap."
    },
    {
      "code": 6035,
      "name": "zeroTradableAmount",
      "msg": "There are no tradable amount to swap."
    },
    {
      "code": 6036,
      "name": "amountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    },
    {
      "code": 6037,
      "name": "amountInAboveMaximum",
      "msg": "Amount in above maximum threshold"
    },
    {
      "code": 6038,
      "name": "tickArraySequenceInvalidIndex",
      "msg": "Invalid index for tick array sequence"
    },
    {
      "code": 6039,
      "name": "amountCalcOverflow",
      "msg": "Amount calculated overflows"
    },
    {
      "code": 6040,
      "name": "amountRemainingOverflow",
      "msg": "Amount remaining overflows"
    },
    {
      "code": 6041,
      "name": "invalidIntermediaryMint",
      "msg": "Invalid intermediary mint"
    },
    {
      "code": 6042,
      "name": "duplicateTwoHopPool",
      "msg": "Duplicate two hop pool"
    },
    {
      "code": 6043,
      "name": "invalidBundleIndex",
      "msg": "Bundle index is out of bounds"
    },
    {
      "code": 6044,
      "name": "bundledPositionAlreadyOpened",
      "msg": "Position has already been opened"
    },
    {
      "code": 6045,
      "name": "bundledPositionAlreadyClosed",
      "msg": "Position has already been closed"
    },
    {
      "code": 6046,
      "name": "positionBundleNotDeletable",
      "msg": "Unable to delete PositionBundle with open positions"
    },
    {
      "code": 6047,
      "name": "unsupportedTokenMint",
      "msg": "Token mint has unsupported attributes"
    },
    {
      "code": 6048,
      "name": "remainingAccountsInvalidSlice",
      "msg": "Invalid remaining accounts"
    },
    {
      "code": 6049,
      "name": "remainingAccountsInsufficient",
      "msg": "Insufficient remaining accounts"
    },
    {
      "code": 6050,
      "name": "noExtraAccountsForTransferHook",
      "msg": "Unable to call transfer hook without extra accounts"
    },
    {
      "code": 6051,
      "name": "intermediateTokenAmountMismatch",
      "msg": "Output and input amount mismatch"
    },
    {
      "code": 6052,
      "name": "transferFeeCalculationError",
      "msg": "Transfer fee calculation failed"
    },
    {
      "code": 6053,
      "name": "remainingAccountsDuplicatedAccountsType",
      "msg": "Same accounts type is provided more than once"
    },
    {
      "code": 6054,
      "name": "fullRangeOnlyPool",
      "msg": "This whirlpool only supports full-range positions"
    },
    {
      "code": 6055,
      "name": "tooManySupplementalTickArrays",
      "msg": "Too many supplemental tick arrays provided"
    },
    {
      "code": 6056,
      "name": "differentWhirlpoolTickArrayAccount",
      "msg": "TickArray account for different whirlpool provided"
    },
    {
      "code": 6057,
      "name": "partialFillError",
      "msg": "Trade resulted in partial fill"
    },
    {
      "code": 6058,
      "name": "positionNotLockable",
      "msg": "Position is not lockable"
    },
    {
      "code": 6059,
      "name": "operationNotAllowedOnLockedPosition",
      "msg": "Operation not allowed on locked position"
    }
  ],
  "types": [
    {
      "name": "lockType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "permanent"
          }
        ]
      }
    },
    {
      "name": "lockTypeLabel",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "permanent"
          }
        ]
      }
    },
    {
      "name": "openPositionBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "openPositionWithMetadataBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          },
          {
            "name": "metadataBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "positionRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "growthInsideCheckpoint",
            "type": "u128"
          },
          {
            "name": "amountOwed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "tick",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "liquidityNet",
            "type": "i128"
          },
          {
            "name": "liquidityGross",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideA",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideB",
            "type": "u128"
          },
          {
            "name": "rewardGrowthsOutside",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "whirlpoolBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "whirlpoolRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "emissionsPerSecondX64",
            "type": "u128"
          },
          {
            "name": "growthGlobalX64",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "accountsType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "transferHookA"
          },
          {
            "name": "transferHookB"
          },
          {
            "name": "transferHookReward"
          },
          {
            "name": "transferHookInput"
          },
          {
            "name": "transferHookIntermediate"
          },
          {
            "name": "transferHookOutput"
          },
          {
            "name": "supplementalTickArrays"
          },
          {
            "name": "supplementalTickArraysOne"
          },
          {
            "name": "supplementalTickArraysTwo"
          }
        ]
      }
    },
    {
      "name": "remainingAccountsInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slices",
            "type": {
              "vec": {
                "defined": {
                  "name": "remainingAccountsSlice"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "remainingAccountsSlice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountsType",
            "type": {
              "defined": {
                "name": "accountsType"
              }
            }
          },
          {
            "name": "length",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "whirlpoolsConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeAuthority",
            "type": "pubkey"
          },
          {
            "name": "collectProtocolFeesAuthority",
            "type": "pubkey"
          },
          {
            "name": "rewardEmissionsSuperAuthority",
            "type": "pubkey"
          },
          {
            "name": "defaultProtocolFeeRate",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "whirlpoolsConfigExtension",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "pubkey"
          },
          {
            "name": "configExtensionAuthority",
            "type": "pubkey"
          },
          {
            "name": "tokenBadgeAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "feeTier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "pubkey"
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "defaultFeeRate",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "lockConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "positionOwner",
            "type": "pubkey"
          },
          {
            "name": "whirlpool",
            "type": "pubkey"
          },
          {
            "name": "lockedTimestamp",
            "type": "u64"
          },
          {
            "name": "lockType",
            "type": {
              "defined": {
                "name": "lockTypeLabel"
              }
            }
          }
        ]
      }
    },
    {
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "pubkey"
          },
          {
            "name": "positionMint",
            "type": "pubkey"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "tickLowerIndex",
            "type": "i32"
          },
          {
            "name": "tickUpperIndex",
            "type": "i32"
          },
          {
            "name": "feeGrowthCheckpointA",
            "type": "u128"
          },
          {
            "name": "feeOwedA",
            "type": "u64"
          },
          {
            "name": "feeGrowthCheckpointB",
            "type": "u128"
          },
          {
            "name": "feeOwedB",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "positionRewardInfo"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "positionBundle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBundleMint",
            "type": "pubkey"
          },
          {
            "name": "positionBitmap",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tickArray",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTickIndex",
            "type": "i32"
          },
          {
            "name": "ticks",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "tick"
                  }
                },
                88
              ]
            }
          },
          {
            "name": "whirlpool",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "tokenBadge",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "whirlpool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "pubkey"
          },
          {
            "name": "whirlpoolBump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "tickSpacingSeed",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "feeRate",
            "type": "u16"
          },
          {
            "name": "protocolFeeRate",
            "type": "u16"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "sqrtPrice",
            "type": "u128"
          },
          {
            "name": "tickCurrentIndex",
            "type": "i32"
          },
          {
            "name": "protocolFeeOwedA",
            "type": "u64"
          },
          {
            "name": "protocolFeeOwedB",
            "type": "u64"
          },
          {
            "name": "tokenMintA",
            "type": "pubkey"
          },
          {
            "name": "tokenVaultA",
            "type": "pubkey"
          },
          {
            "name": "feeGrowthGlobalA",
            "type": "u128"
          },
          {
            "name": "tokenMintB",
            "type": "pubkey"
          },
          {
            "name": "tokenVaultB",
            "type": "pubkey"
          },
          {
            "name": "feeGrowthGlobalB",
            "type": "u128"
          },
          {
            "name": "rewardLastUpdatedTimestamp",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "whirlpoolRewardInfo"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "liquidityDecreased",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "tickLowerIndex",
            "type": "i32"
          },
          {
            "name": "tickUpperIndex",
            "type": "i32"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "tokenAAmount",
            "type": "u64"
          },
          {
            "name": "tokenBAmount",
            "type": "u64"
          },
          {
            "name": "tokenATransferFee",
            "type": "u64"
          },
          {
            "name": "tokenBTransferFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "liquidityIncreased",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          },
          {
            "name": "tickLowerIndex",
            "type": "i32"
          },
          {
            "name": "tickUpperIndex",
            "type": "i32"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "tokenAAmount",
            "type": "u64"
          },
          {
            "name": "tokenBAmount",
            "type": "u64"
          },
          {
            "name": "tokenATransferFee",
            "type": "u64"
          },
          {
            "name": "tokenBTransferFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "pubkey"
          },
          {
            "name": "whirlpoolsConfig",
            "type": "pubkey"
          },
          {
            "name": "tokenMintA",
            "type": "pubkey"
          },
          {
            "name": "tokenMintB",
            "type": "pubkey"
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "tokenProgramA",
            "type": "pubkey"
          },
          {
            "name": "tokenProgramB",
            "type": "pubkey"
          },
          {
            "name": "decimalsA",
            "type": "u8"
          },
          {
            "name": "decimalsB",
            "type": "u8"
          },
          {
            "name": "initialSqrtPrice",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "traded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "pubkey"
          },
          {
            "name": "aToB",
            "type": "bool"
          },
          {
            "name": "preSqrtPrice",
            "type": "u128"
          },
          {
            "name": "postSqrtPrice",
            "type": "u128"
          },
          {
            "name": "inputAmount",
            "type": "u64"
          },
          {
            "name": "outputAmount",
            "type": "u64"
          },
          {
            "name": "inputTransferFee",
            "type": "u64"
          },
          {
            "name": "outputTransferFee",
            "type": "u64"
          },
          {
            "name": "lpFee",
            "type": "u64"
          },
          {
            "name": "protocolFee",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
