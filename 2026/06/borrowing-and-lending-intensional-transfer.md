# Borrowing and Lending: Intensional Transfer Across Gödelian Isomorphisms

*Notes — working draft, probably wrong in places*

---

Tarau's paper "Everything is Everything" (PPDP 2004) is about bijections. All the finite
combinatorial structures you care about — sets of naturals, multisets, sequences, trees —
are in computable bijection with ℕ. This is not shocking. Countable structures are
countable. Fine.

What *is* interesting is what you can do with a *specific* bijection once you have it.

## The Setup

Two encodings do most of the work.

**Binary / characteristic function** — the trivial one:

```
nat2set : ℕ → 𝒫_fin(ℕ)
nat2set(n) = { k : bit k of n = 1 }

set2nat : 𝒫_fin(ℕ) → ℕ
set2nat({k₁, k₂, ...}) = 2^k₁ + 2^k₂ + ...
```

So `5 = 0b101` corresponds to the set `{0, 2}`. Boring but useful.

**Gödel / prime factorization** — the clever one:

```
seq2nat : ℕ* → ℕ
seq2nat([a₀, a₁, ..., aₙ]) = 2^(a₀+1) · 3^(a₁+1) · 5^(a₂+1) · ⋯ · pₙ^(aₙ+1)

nat2seq : ℕ → ℕ*
nat2seq(n) = [v₂(n)-1, v₃(n)-1, v₅(n)-1, ...]
```

where `vₚ(n)` is the p-adic valuation of `n`, and we only emit exponents that are
positive. The +1 offsets let you encode 0 in a sequence and distinguish it from "not
present."

Trees come from encoding a tree as the sequence of its children's encodings. Compose that
with `seq2nat` and you get nat↔tree.

## The Boring Version: Extensional Transfer

Once you have a bijection `f : A → B`, `g : B → A` (with `f ∘ g = id`, `g ∘ f = id`),
you can transfer *any* operation `op_A : A → A` to a corresponding `op_B : B → B`:

```
op_B = f ∘ op_A ∘ g
```

That's it. Everything is everything. Done.

But this is unsatisfying. The transferred operation `op_B` is a black box — it doesn't
use any structure of `B`. It just converts to `A`, does the operation, converts back. You
haven't learned anything about `B`. You've used `B` as a carrier for `A`'s computation.

## The Interesting Version: Intensional Transfer

The question is: can I write `op_B` **using only the constructors of `B`**, without
reference to the bijection?

If yes, the operation has been *genuinely transferred* — it lives in `B`'s world. If no,
then `B` is just wearing `A`'s operations as a costume.

Let's make this concrete. Take the binary encoding: `NatSet` via `ℕ`.

The constructors of `NatSet`:

```fsharp
type NatSet =
    | Empty
    | Insert of int * NatSet   // Insert(k, s) where k ∉ s
```

The constructors of `Nat`, viewed through its binary structure:

```fsharp
type Nat =
    | Zero
    | Even of Nat      // 2n
    | Odd  of Nat      // 2n + 1
```

This is a non-standard presentation but it makes the trie structure of binary numbers
explicit — and it's the one that makes the isomorphism legible.

Now, **lending `NatSet` operations to `Nat`**:

| NatSet operation    | Nat form                    |
|---------------------|-----------------------------|
| `empty`             | `0`                         |
| `insert k s`        | `s \|\|\| (1 <<< k)`        |
| `member k s`        | `(s >>> k) &&& 1 = 1`       |
| `union s t`         | `s \|\|\| t`                |
| `intersection s t`  | `s &&& t`                   |
| `delete k s`        | `s &&& ~~~(1 <<< k)`        |

These are cheap because the `Nat` representation *is* the characteristic function.
Membership and union are just bitwise operations. The `Nat` constructors are doing real
work here, not just encoding.

Now flip it. **Lending `Nat` operations to `NatSet`** — what does `Succ` look like when
written with only `NatSet` constructors?

```fsharp
let rec succAsSet (s: NatSet) : NatSet =
    if not (member 0 s) then
        Insert(0, s)
        // 0 is free — just add it, no carry needed
    else
        Insert(0, delete 0 (succAsSet (delete 0 s)))
        // carry: propagate past the trailing 1-bits,
        //        then plant a 0 and recurse upward
```

That's binary increment, but written entirely in `NatSet` operations. No bijection in
sight. The carry propagation is a real recursive `NatSet` computation.

This is what intensional transfer means: the transferred operation is *native* to its new
type. It uses that type's constructors for its recursion, not just as a vehicle.

## Why "Borrowing and Lending"

If I take out a loan of `NatSet` operations — if I decide to think of my `Nat` as a set
and use `union`, `intersection`, `member` — then I incur a debt: I need to be able to
express `Nat`'s own operations in `NatSet` terms when I need them. The isomorphism is the
credit agreement.

The debt is real because the two algebras are *not symmetrically cheap*. Under the binary
encoding:

- **`NatSet` operations cheap in `Nat`**: union, intersection, symmetric difference,
  complement — all O(log n) bitwise
- **`Nat` operations cheap in `NatSet`**: those same ones, because they *are* the bitwise
  operations
- **`Nat` operations expensive in `NatSet`**: successor (requires carry propagation),
  general arithmetic

Under the Gödel encoding (seq↔nat), the picture shifts:

- `length` of the encoded sequence requires counting distinct prime factors — expensive
- Index access requires extracting a specific p-adic valuation — manageable but not free
- Concatenation of sequences multiplies their encodings — tractable but opaque

So the choice of encoding determines *which side of the isomorphism is paying off its
loans easily*.

## The Tree Case

This is where things get genuinely interesting. The tree bijection is defined recursively:

```
tree2nat : Tree → ℕ
tree2nat(Leaf) = 0
tree2nat(Node(t₁, t₂, ..., tₖ)) = seq2nat([tree2nat(t₁), ..., tree2nat(tₖ)])
```

What does `Succ` look like on trees? What does it mean to *increment* a tree?

Extensionally: apply `nat2tree` to `tree2nat(t) + 1`. But can you write *that* using only
tree constructors?

The recursion would unfold like this:
1. The children of the tree are themselves trees
2. Incrementing the tree means incrementing the Gödel-encoded sequence of its children
3. Incrementing a Gödel-encoded sequence means multiplying by a prime or adjusting a
   prime exponent
4. But that adjustment lives in `Nat` terms...

Whether this bottoms out into a clean expression using only tree constructors is not
obvious to me. The tree case is where I think the Lean formalization would tell you
something definitive that informal reasoning won't. It's also where the question of
whether the transfer is *genuinely* intensional vs. just "extensional with extra steps"
becomes sharp.

## OBJ Theories as Loan Contracts

OBJ3/Maude lets you write down the *contract* of the borrowing relationship as equations,
without committing to an implementation. You declare both types and write the laws the
bijection must satisfy:

```maude
mod GODEL-SETS is
  protecting NAT .
  sort NatSet .
  op empty : -> NatSet .
  op insert : Nat NatSet -> NatSet .
  op member : Nat NatSet -> Bool .
  op union : NatSet NatSet -> NatSet .

  op nat2set : Nat -> NatSet .
  op set2nat : NatSet -> Nat .

  --- round-trip laws
  eq set2nat(nat2set(N)) = N .
  eq nat2set(set2nat(S)) = S .

  --- intensional laws: NatSet operations expressed as Nat operations
  eq nat2set(N | M) = union(nat2set(N), nat2set(M)) .
  eq member(K, nat2set(N)) = testBit(N, K) .
  eq nat2set(N & M) = intersection(nat2set(N), nat2set(M)) .
endm
```

The last three equations are the interesting ones. They don't just say the operations are
*equivalent up to bijection* — they say the bitwise operations on `Nat` *are* the set
operations on `NatSet`, as equal terms in the theory. That's the intensional claim
expressed as an equation, and Maude's rewriting can check it on concrete values.

## Connections

A few threads worth pulling on:

**Category theory**: The extensional transfer is just transport of structure along an
isomorphism of carriers. The intensional version is something stronger — an algebra
morphism in the category of algebras for a given signature. Whether the intensional
transfer always exists (given an extensional one) is a non-trivial question about the
algebras involved.

**HoTT / Lean**: Lean's `transport` in HoTT terms is an extensional transfer along a
path (equivalence). Intensional transfer might correspond to a structure-preserving map
that doesn't go through univalence — something you'd prove separately, not derive
automatically.

**F\* refinements**: You can tag a `Nat` with `{n : Nat | nat2set n = s}` and track
which "perspective" you're operating in. The type system then enforces that you're
consistently working within one algebra's laws. The bijection becomes a coercion rule.

**Complexity**: The asymmetry between cheap and expensive sides of the isomorphism might
have a precise complexity-theoretic formulation. Which operations can be "lent" cheaply?
Is there a notion of *complexity-preserving* isomorphism, distinct from the plain
bijection?

## Open Questions

- Is there a clean general definition of "intensional transfer" at the level of
  signatures and algebras? It feels like it should be: a homomorphism of `Σ-algebras`
  that commutes with the constructors, not just an isomorphism of the underlying sets.

- For the tree bijection specifically: what does the full Peano algebra look like,
  expressed purely in tree constructors? Does it have a clean recursive structure, or does
  it degrade into an opaque encoding?

- If the intensional transfer for trees doesn't exist cleanly, does that tell you
  something fundamental about the tree encoding — that it's less "transparent" than the
  binary encoding?

- Is there a practical payoff? Can you use the borrowing/lending idea to derive efficient
  algorithms — e.g., compute set operations by working in `Nat` (bitwise) when that's
  cheaper, and switch back to `NatSet` when you need tree structure?

---

*Everything is everything. But some everythings are cheaper than others.*

---

**References**

- Tarau, P. "Everything is Everything: Transfinite Arithmetic on Conditionally Terminating
  Rewrite Systems." PPDP 2004.
- OBJ3 / Maude system: <http://maude.cs.illinois.edu>
