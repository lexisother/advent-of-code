lines = ARGF.each_line(chomp: true).map do |line|
  hand, bid = line.split
  [hand, bid.to_i]
end

CARD_ORDER = %w[A K Q J T 9 8 7 6 5 4 3 2].each_with_index.to_h
HAND_ORDER = %i[five four full three two one high].each_with_index.to_h

def hand_type(hand)
  shape = hand.chars.tally.values.sort.reverse
  case shape
  in [5] then :five
  in [4, *] then :four
  in [3, 2] then :full
  in [2, 2, *] then :two
  in [2, *] then :one
  else :high
  end
end

a1 = lines.map { |h, b| [hand_type(h), h, b] }
  .sort_by { |t, h| [HAND_ORDER[t], h.chars.map(&CARD_ORDER)] }
  .reverse_each
  .with_index
  .map { |x, i| x[2] * (i + 1) }
  .sum
puts a1

P2_CARD_ORDER = %w[A K Q T 9 8 7 6 5 4 3 2 J].each_with_index.to_h

def sub_joker(hand)
  shape = hand.chars.tally
  js = shape.delete('J') { 0 }
  shape = shape.values.sort.reverse
  v = shape.fetch(0, 0)
  shape[0] = v + js
  shape
end

def p2_hand_type(hand)
  shape = sub_joker(hand)
  case shape
  in [5] then :five
  in [4, *] then :four
  in [3, 2] then :full
  in [3, *] then :three
  in [2, 2, *] then :two
  in [2, *] then :one
  else :high
  end
end

a2 = lines.map { |h, b| [p2_hand_type(h), h, b] }
  .sort_by { |t, h| [HAND_ORDER[t], h.chars.map(&P2_CARD_ORDER)] }
  .reverse_each
  .with_index
  .map { |x, i| x[2] * (i + 1) }
  .sum
puts a2
