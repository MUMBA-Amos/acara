<!-- src/components/homepage/CategoriesBar.vue -->
<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: 'all' },
  // pill = separate bubbles (your target); bar = flat strip (optional)
  variant: { type: String, default: 'bar' },
  categories: {
    type: Array,
    default: () => [
      { label: 'All\nEvents', slug: 'all' },
      { label: 'Religious\n& Spiritual', slug: 'religious' },
      { label: 'Culture, Arts\n& Heritage', slug: 'culture' },
      { label: 'Business\n& Education', slug: 'business' },
      { label: 'Food &\nMarkets', slug: 'food' },
      { label: 'Wellness &\nNature', slug: 'wellness' },
      { label: 'Festivals &\nEntertainment', slug: 'festivals' },
      { label: 'Sports &\nOutdoor', slug: 'sports' },
      { label: 'Government\n& Civic', slug: 'government' },
      { label: 'Nightlife &\nSocial', slug: 'nightlife' },
      { label: 'Other', slug: 'other' },
    ],
  },
})
const emit = defineEmits(['update:modelValue', 'change'])

const current = ref(props.modelValue)
watch(
  () => props.modelValue,
  (v) => (current.value = v),
)

function select(slug) {
  if (slug === current.value) return
  current.value = slug
  emit('update:modelValue', slug)
  emit('change', slug)
}

const items = computed(() => props.categories)
</script>

<template>
  <div class="catbar-wrapper" :class="variant">
    <ul class="catbar" role="tablist">
      <li v-for="c in items" :key="c.slug">
        <button
          class="cat"
          :class="{ active: c.slug === current }"
          role="tab"
          :aria-selected="c.slug === current"
          @click="select(c.slug)"
        >
          <span v-html="c.label.replaceAll('\n', '<br/>')"></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Ribbon container with green borders */
.catbar-wrapper.bar {
  background: #2f4046; /* dark teal background like image */ /* green bottom border */
  border-radius: 0; /* no rounding to match image */
  padding: 6px 8px 0 8px; /* reduced padding to fit more content, no bottom padding */
  margin: 0 auto; /* center the container, no top margin */
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1000px; /* increased width for better spacing */
  position: relative;
}

/* Single-row, centered, no overflow */
.catbar {
  display: flex;
  flex-wrap: nowrap; /* one row only */
  justify-content: center;
  gap: 2px; /* very minimal gaps to fit all categories */
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: visible; /* no scrolling needed */
  max-width: 100%; /* use full width */
  flex-shrink: 1; /* allow shrinking if needed */
}
.catbar::-webkit-scrollbar {
  height: 0;
} /* Chrome/Edge */

/* Category blocks (dark grey blocks) */
.cat {
  background: #2f4046; /* dark grey background like image */
  color: #f4e7ce; /* light grey text like image */
  border: none;
  border-radius: 3px; /* subtle rounding */
  padding: 6px 8px; /* very compact padding */
  min-width: 0; /* allow flexible width */
  flex: 1 1 0; /* equal flex distribution */
  text-align: center;
  font-weight: 500; /* medium weight like image */
  line-height: 1; /* very tight line height */
  letter-spacing: 0;
  white-space: normal; /* allow 2 lines */
  cursor: pointer;
  transition:
    background 0.15s ease,
    filter 0.15s ease;
  outline: 0;
  font-family: 'Kantumruy Pro', sans-serif; /* Kantumruy Pro font */
  font-size: 0.8rem; /* smaller font to fit more */
}

/* Special styling for "Other" category - same background as main bar */
.cat:last-child {
  background: #2f4046; /* same as main background */
  color: #f4e7ce;
}

/* Hover: slight brightening */
.cat:hover {
  filter: brightness(1.1);
}

/* Active tab: slightly different highlight */
.cat.active {
  background: #2c3e50; /* slightly lighter grey for active */
  filter: brightness(1.05);
}

/* Active "Other" category */
.cat:last-child.active {
  background: #008080; /* slightly lighter teal for active "Other" */
}

/* Keyboard focus: subtle ring for a11y */
.cat:focus-visible {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

/* Responsive adjustments */
/* Large tablets and small desktops */
@media (max-width: 1200px) {
  .catbar-wrapper.bar {
    max-width: 100%;
    padding: 5px 8px 0 8px;
    margin: 0 auto;
  }

  .cat {
    padding: 6px 8px;
    font-size: 0.75rem;
  }
  .catbar {
    gap: 2px;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .catbar-wrapper.bar {
    max-width: 100%;
    padding: 4px 6px 0 6px;
    margin: 0 auto;
  }

  .catbar {
    gap: 2px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cat {
    padding: 5px 7px;
    font-size: 0.7rem;
    line-height: 1.1;
    min-width: 85px;
    flex: 0 1 auto;
  }
}

/* Large phones */
@media (max-width: 600px) {
  .catbar-wrapper.bar {
    padding: 3px 5px 0 5px;
    margin: 0 auto;
  }

  .cat {
    padding: 4px 6px;
    font-size: 0.65rem;
    min-width: 75px;
  }

  .catbar {
    gap: 1px;
  }
}

/* Small phones */
@media (max-width: 480px) {
  .catbar-wrapper.bar {
    padding: 3px 4px 0 4px;
    margin: 0 auto;
  }

  .cat {
    padding: 4px 5px;
    font-size: 0.6rem;
    min-width: 70px;
  }

  .catbar {
    gap: 1px;
  }
}

/* iPhone SE and extra small phones */
@media (max-width: 375px) {
  .catbar-wrapper.bar {
    padding: 3px 4px 0 4px;
    margin: 0 auto;
  }

  .cat {
    padding: 4px 5px;
    font-size: 0.6rem;
    min-width: 68px;
  }

  .catbar {
    gap: 1px;
  }
}
</style>
