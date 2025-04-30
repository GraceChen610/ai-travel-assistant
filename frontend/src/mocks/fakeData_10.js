export const fakedata = {
  meta: {
    count: 10,
    links: {
      self: "*/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2025-04-21&returnDate=2025-05-02&adults=1&nonStop=false&max=10",
    },
  },
  data: [
    {
      type: "flight-offer",
      id: "1",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 9,
      itineraries: [
        {
          duration: "PT15H35M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T21:45:00",
              },

              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T10:20:00",
              },
              carrierCode: "CZ",
              number: "357",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT3H5M",
              id: "6",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT20H20M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                at: "2025-05-02T20:20:00",
              },
              arrival: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-05-03T00:05:00",
              },
              carrierCode: "CZ",
              number: "8020",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT2H45M",
              id: "9",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-05-03T08:05:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-05-03T19:40:00",
              },
              carrierCode: "CZ",
              number: "301",
              aircraft: {
                code: "789",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT9H35M",
              id: "10",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "552.89",
        base: "352.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "552.89",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["CZ"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "552.89",
            base: "352.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "5",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRYPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "6",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRYPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "9",
              cabin: "ECONOMY",
              fareBasis: "V2LSRYPX",
              class: "V",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "10",
              cabin: "ECONOMY",
              fareBasis: "V2LSRYPX",
              class: "V",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "2",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 9,
      itineraries: [
        {
          duration: "PT15H35M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T21:45:00",
              },
              arrival: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T05:25:00",
              },
              carrierCode: "CZ",
              number: "302",
              aircraft: {
                code: "789",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT9H40M",
              id: "5",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T08:15:00",
              },
              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T10:20:00",
              },
              carrierCode: "CZ",
              number: "357",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT3H5M",
              id: "6",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT15H40M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                at: "2025-05-02T13:45:00",
              },
              arrival: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-05-02T17:05:00",
              },
              carrierCode: "CZ",
              number: "8100",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT2H20M",
              id: "17",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-05-02T21:00:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-05-03T08:25:00",
              },
              carrierCode: "CZ",
              number: "325",
              aircraft: {
                code: "350",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT9H25M",
              id: "18",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "612.89",
        base: "412.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "612.89",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["CZ"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "612.89",
            base: "412.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "5",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRYPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "6",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRYPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "17",
              cabin: "ECONOMY",
              fareBasis: "E2LSRYPX",
              class: "E",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "18",
              cabin: "ECONOMY",
              fareBasis: "E2LSRYPX",
              class: "E",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "3",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 1,
      itineraries: [
        {
          duration: "PT15H35M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T21:45:00",
              },
              arrival: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T05:25:00",
              },
              carrierCode: "CZ",
              number: "302",
              aircraft: {
                code: "789",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT9H40M",
              id: "5",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T08:15:00",
              },
              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T10:20:00",
              },
              carrierCode: "CZ",
              number: "357",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT3H5M",
              id: "6",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT15H35M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                terminal: "I",
                at: "2025-05-02T21:40:00",
              },
              arrival: {
                iataCode: "MEL",
                terminal: "2",
                at: "2025-05-03T09:20:00",
              },
              carrierCode: "JQ",
              number: "30",
              aircraft: {
                code: "788",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT8H40M",
              id: "15",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "AVV",
                terminal: "D",
                at: "2025-05-03T14:55:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "2",
                at: "2025-05-03T16:15:00",
              },
              carrierCode: "JQ",
              number: "608",
              aircraft: {
                code: "320",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT1H20M",
              id: "16",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "628.33",
        base: "476.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "628.33",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["CZ"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "628.33",
            base: "476.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "5",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRSPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "6",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRSPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "15",
              cabin: "ECONOMY",
              fareBasis: "HLOW2",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "16",
              cabin: "ECONOMY",
              fareBasis: "HLOW",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "4",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 1,
      itineraries: [
        {
          duration: "PT15H35M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T21:45:00",
              },
              arrival: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T05:25:00",
              },
              carrierCode: "CZ",
              number: "302",
              aircraft: {
                code: "789",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT9H40M",
              id: "5",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T08:15:00",
              },
              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T10:20:00",
              },
              carrierCode: "CZ",
              number: "357",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT3H5M",
              id: "6",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT17H25M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                terminal: "I",
                at: "2025-05-02T21:40:00",
              },
              arrival: {
                iataCode: "MEL",
                terminal: "2",
                at: "2025-05-03T09:20:00",
              },
              carrierCode: "JQ",
              number: "30",
              aircraft: {
                code: "788",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT8H40M",
              id: "11",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "AVV",
                terminal: "D",
                at: "2025-05-03T16:40:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "2",
                at: "2025-05-03T18:05:00",
              },
              carrierCode: "JQ",
              number: "610",
              aircraft: {
                code: "320",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT1H25M",
              id: "12",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "628.33",
        base: "476.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "628.33",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["CZ"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "628.33",
            base: "476.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "5",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRSPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "6",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRSPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "11",
              cabin: "ECONOMY",
              fareBasis: "HLOW2",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "12",
              cabin: "ECONOMY",
              fareBasis: "HLOW",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "5",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 1,
      itineraries: [
        {
          duration: "PT15H35M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T21:45:00",
              },
              arrival: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T05:25:00",
              },
              carrierCode: "CZ",
              number: "302",
              aircraft: {
                code: "789",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT9H40M",
              id: "5",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T08:15:00",
              },
              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T10:20:00",
              },
              carrierCode: "CZ",
              number: "357",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT3H5M",
              id: "6",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT13H35M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                terminal: "I",
                at: "2025-05-02T21:40:00",
              },
              arrival: {
                iataCode: "MEL",
                terminal: "2",
                at: "2025-05-03T09:20:00",
              },
              carrierCode: "JQ",
              number: "30",
              aircraft: {
                code: "788",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT8H40M",
              id: "13",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "MEL",
                terminal: "4",
                at: "2025-05-03T12:50:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "2",
                at: "2025-05-03T14:15:00",
              },
              carrierCode: "JQ",
              number: "514",
              aircraft: {
                code: "321",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT1H25M",
              id: "14",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "647.33",
        base: "495.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "647.33",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["CZ"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "647.33",
            base: "495.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "5",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRSPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "6",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRSPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "13",
              cabin: "ECONOMY",
              fareBasis: "HLOW2",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "14",
              cabin: "ECONOMY",
              fareBasis: "HLOW",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "6",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 1,
      itineraries: [
        {
          duration: "PT15H35M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T21:45:00",
              },
              arrival: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T05:25:00",
              },
              carrierCode: "CZ",
              number: "302",
              aircraft: {
                code: "789",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT9H40M",
              id: "5",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-04-22T08:15:00",
              },
              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T10:20:00",
              },
              carrierCode: "CZ",
              number: "357",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT3H5M",
              id: "6",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT14H45M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                terminal: "I",
                at: "2025-05-02T21:40:00",
              },
              arrival: {
                iataCode: "MEL",
                terminal: "2",
                at: "2025-05-03T09:20:00",
              },
              carrierCode: "JQ",
              number: "30",
              aircraft: {
                code: "788",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT8H40M",
              id: "19",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "MEL",
                terminal: "4",
                at: "2025-05-03T14:00:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "2",
                at: "2025-05-03T15:25:00",
              },
              carrierCode: "JQ",
              number: "516",
              aircraft: {
                code: "321",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT1H25M",
              id: "20",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "647.33",
        base: "495.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "647.33",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["CZ"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "647.33",
            base: "495.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "5",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRSPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "6",
              cabin: "ECONOMY",
              fareBasis: "Z2LSRSPX",
              class: "Z",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "19",
              cabin: "ECONOMY",
              fareBasis: "HLOW2",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "20",
              cabin: "ECONOMY",
              fareBasis: "HLOW",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "7",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 9,
      itineraries: [
        {
          duration: "PT18H15M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T22:10:00",
              },
              arrival: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-04-22T05:00:00",
              },
              carrierCode: "MH",
              number: "140",
              aircraft: {
                code: "333",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT8H50M",
              id: "1",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-04-22T12:10:00",
              },
              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T13:25:00",
              },
              carrierCode: "MH",
              number: "788",
              aircraft: {
                code: "73H",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT2H15M",
              id: "2",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT20H55M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                at: "2025-05-02T19:40:00",
              },
              arrival: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-05-02T22:50:00",
              },
              carrierCode: "MH",
              number: "781",
              aircraft: {
                code: "73H",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT2H10M",
              id: "21",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-05-03T09:10:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-05-03T19:35:00",
              },
              carrierCode: "MH",
              number: "141",
              aircraft: {
                code: "333",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT8H25M",
              id: "22",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "720.95",
        base: "575.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "720.95",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["MH"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "720.95",
            base: "575.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "1",
              cabin: "ECONOMY",
              fareBasis: "OLTBXRAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "O",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "2",
              cabin: "ECONOMY",
              fareBasis: "OLTBXRAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "O",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "21",
              cabin: "ECONOMY",
              fareBasis: "VBX1YAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "V",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "22",
              cabin: "ECONOMY",
              fareBasis: "VBX1YAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "V",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "8",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 9,
      itineraries: [
        {
          duration: "PT18H15M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T22:10:00",
              },
              arrival: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-04-22T05:00:00",
              },
              carrierCode: "MH",
              number: "140",
              aircraft: {
                code: "333",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT8H50M",
              id: "1",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-04-22T12:10:00",
              },
              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T13:25:00",
              },
              carrierCode: "MH",
              number: "788",
              aircraft: {
                code: "73H",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT2H15M",
              id: "2",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT21H55M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                at: "2025-05-02T18:40:00",
              },
              arrival: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-05-02T21:55:00",
              },
              carrierCode: "MH",
              number: "775",
              aircraft: {
                code: "73H",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT2H15M",
              id: "23",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-05-03T09:10:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-05-03T19:35:00",
              },
              carrierCode: "MH",
              number: "141",
              aircraft: {
                code: "333",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT8H25M",
              id: "24",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "720.95",
        base: "575.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "720.95",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["MH"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "720.95",
            base: "575.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "1",
              cabin: "ECONOMY",
              fareBasis: "OLTBXRAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "O",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "2",
              cabin: "ECONOMY",
              fareBasis: "OLTBXRAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "O",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "23",
              cabin: "ECONOMY",
              fareBasis: "VBX1YAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "V",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "24",
              cabin: "ECONOMY",
              fareBasis: "VBX1YAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "V",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "9",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 1,
      itineraries: [
        {
          duration: "PT25H20M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "2",
                at: "2025-04-21T21:20:00",
              },
              arrival: {
                iataCode: "AVV",
                terminal: "D",
                at: "2025-04-21T22:50:00",
              },
              carrierCode: "JQ",
              number: "613",
              aircraft: {
                code: "320",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT1H30M",
              id: "3",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "MEL",
                terminal: "2",
                at: "2025-04-22T13:20:00",
              },
              arrival: {
                iataCode: "BKK",
                terminal: "I",
                at: "2025-04-22T19:40:00",
              },
              carrierCode: "JQ",
              number: "29",
              aircraft: {
                code: "788",
              },
              operating: {
                carrierCode: "JQ",
              },
              duration: "PT9H20M",
              id: "4",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT20H20M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                at: "2025-05-02T20:20:00",
              },
              arrival: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-05-03T00:05:00",
              },
              carrierCode: "CZ",
              number: "8020",
              aircraft: {
                code: "7M8",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT2H45M",
              id: "9",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "CAN",
                terminal: "2",
                at: "2025-05-03T08:05:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-05-03T19:40:00",
              },
              carrierCode: "CZ",
              number: "301",
              aircraft: {
                code: "789",
              },
              operating: {
                carrierCode: "CZ",
              },
              duration: "PT9H35M",
              id: "10",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "743.18",
        base: "586.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "743.18",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["CZ"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "743.18",
            base: "586.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "3",
              cabin: "ECONOMY",
              fareBasis: "NFXL",
              class: "N",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "4",
              cabin: "ECONOMY",
              fareBasis: "HLOW2",
              class: "H",
              includedCheckedBags: {
                weight: 20,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "9",
              cabin: "ECONOMY",
              fareBasis: "V2LSRSPX",
              class: "V",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
            {
              segmentId: "10",
              cabin: "ECONOMY",
              fareBasis: "V2LSRSPX",
              class: "V",
              includedCheckedBags: {
                quantity: 2,
              },
              includedCabinBags: {
                quantity: 1,
              },
            },
          ],
        },
      ],
    },
    {
      type: "flight-offer",
      id: "10",
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: false,
      isUpsellOffer: false,
      lastTicketingDate: "2025-04-21",
      lastTicketingDateTime: "2025-04-21",
      numberOfBookableSeats: 3,
      itineraries: [
        {
          duration: "PT18H15M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-04-21T22:10:00",
              },
              arrival: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-04-22T05:00:00",
              },
              carrierCode: "MH",
              number: "140",
              aircraft: {
                code: "333",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT8H50M",
              id: "1",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-04-22T12:10:00",
              },
              arrival: {
                iataCode: "BKK",
                at: "2025-04-22T13:25:00",
              },
              carrierCode: "MH",
              number: "788",
              aircraft: {
                code: "73H",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT2H15M",
              id: "2",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
        {
          duration: "PT12H20M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                at: "2025-05-02T18:40:00",
              },
              arrival: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-05-02T21:55:00",
              },
              carrierCode: "MH",
              number: "775",
              aircraft: {
                code: "73H",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT2H15M",
              id: "7",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
            {
              departure: {
                iataCode: "KUL",
                terminal: "1",
                at: "2025-05-02T23:45:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "1",
                at: "2025-05-03T10:00:00",
              },
              carrierCode: "MH",
              number: "123",
              aircraft: {
                code: "333",
              },
              operating: {
                carrierCode: "MH",
              },
              duration: "PT8H15M",
              id: "8",
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      price: {
        currency: "EUR",
        total: "750.95",
        base: "605.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "750.95",
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: ["MH"],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "STANDARD",
          travelerType: "ADULT",
          price: {
            currency: "EUR",
            total: "750.95",
            base: "605.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "1",
              cabin: "ECONOMY",
              fareBasis: "OLTBXRAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "O",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "2",
              cabin: "ECONOMY",
              fareBasis: "OLTBXRAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "O",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "7",
              cabin: "ECONOMY",
              fareBasis: "LBX1YAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "L",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
            {
              segmentId: "8",
              cabin: "ECONOMY",
              fareBasis: "LBX1YAU",
              brandedFare: "BASIC",
              brandedFareLabel: "BASIC",
              class: "L",
              includedCheckedBags: {
                weight: 25,
                weightUnit: "KG",
              },
              includedCabinBags: {
                quantity: 1,
              },
              amenities: [
                {
                  description: "PRE RESERVED SEAT ASSIGNMENT",
                  isChargeable: false,
                  amenityType: "PRE_RESERVED_SEAT",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "SNACK",
                  isChargeable: false,
                  amenityType: "MEAL",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHILD DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "INFANT DISCOUNT",
                  isChargeable: false,
                  amenityType: "TRAVEL_SERVICES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "CHANGE AFTER DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
                {
                  description: "REFUND BEFORE DEPARTURE",
                  isChargeable: true,
                  amenityType: "BRANDED_FARES",
                  amenityProvider: {
                    name: "BrandedFare",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  dictionaries: {
    locations: {
      CAN: {
        cityCode: "CAN",
        countryCode: "CN",
      },
      AVV: {
        cityCode: "MEL",
        countryCode: "AU",
      },
      BKK: {
        cityCode: "BKK",
        countryCode: "TH",
      },
      KUL: {
        cityCode: "KUL",
        countryCode: "MY",
      },
      MEL: {
        cityCode: "MEL",
        countryCode: "AU",
      },
      SYD: {
        cityCode: "SYD",
        countryCode: "AU",
      },
    },
    aircraft: {
      320: "AIRBUS A320",
      321: "AIRBUS A321",
      333: "AIRBUS A330-300",
      350: "AIRBUS INDUSTRIE A350",
      788: "BOEING 787-8",
      789: "BOEING 787-9",
      "7M8": "BOEING 737 MAX 8",
      "73H": "BOEING 737-800 (WINGLETS)",
    },
    currencies: {
      EUR: "EURO",
    },
    carriers: {
      CZ: "CHINA SOUTHERN AIRLINES",
      JQ: "JETSTAR",
      MH: "MALAYSIA AIRLINES",
    },
  },
};
