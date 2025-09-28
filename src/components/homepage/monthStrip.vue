<!-- src/components/homepage/monthStrip.vue -->
<script setup>
import { ref, watch } from 'vue'

//Constants decalred
const props = defineProps({
  modelValue: { type: Date, default: () => new Date() },
  minYear: { type: Number, default: 2018 },
  maxYear: { type: Number, default: new Date().getFullYear() + 5 },
})
const emit = defineEmits(['update:modelValue', 'change'])

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const year = ref(props.modelValue.getFullYear())
const month = ref(props.modelValue.getMonth())

//functions declared
watch(
  () => props.modelValue,
  (d) => {
    year.value = d.getFullYear()
    month.value = d.getMonth()
  },
)

function select(i) {
  month.value = i
  const d = new Date(year.value, month.value, 1)
  emit('update:modelValue', d)
  emit('change', { year: year.value, month: month.value })
}
</script>

<template>
  <div class="month-strip">
    <!-- Year display -->
    <div class="year-display">
      {{ year }}
      <span class="dropdown-arrow">▼</span>
    </div>

    <!-- Divider -->
    <div class="divider"></div>

    <!-- Months -->
    <div class="months-container">
      <button
        v-for="(m, i) in months"
        :key="m"
        class="month-btn"
        :class="{ active: i === month }"
        @click="select(i)"
      >
        {{ m }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.month-strip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 8px;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 0;
}

.year-display {
  color: #f4e7ce;
  font-weight: 600;
  font-size: 18px;
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.dropdown-arrow {
  font-size: 12px;
  opacity: 0.8;
}

.divider {
  width: 8px;
  height: 30px;
  opacity: 1;
  border: 2px solid #f4e7ce;
}

.months-container {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.month-btn {
  padding: 6px 12px;
  border: none;
  background: transparent;
  color: #f4e7ce;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Lato', sans-serif;
  cursor: pointer;
  transition: background 0.2s ease;
}

.month-btn.active {
  background: #2f4046;
  color: #f4e7ce;
  position: relative;
  border-radius: 8px;
  font-weight: 600;
}

.month-btn.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 4px solid #2f4046;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .month-strip {
    max-width: 100%;
    padding: 4px 6px;
    gap: 8px;
  }

  .year-display {
    font-size: 18px;
  }

  .month-btn {
    padding: 4px 8px;
    font-size: 12px;
  }

  .months-container {
    gap: 4px;
  }
}

@media (max-width: 480px) {
  .month-strip {
    padding: 3px 4px;
    gap: 6px;
  }

  .year-display {
    font-size: 12px;
  }

  .month-btn {
    padding: 3px 6px;
    font-size: 11px;
  }

  .months-container {
    gap: 2px;
  }

  .divider {
    width: 1px;
    height: 14px;
  }
}
</style>
