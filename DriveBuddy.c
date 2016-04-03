#include <pebble.h>
#include <time.h>
#include <stdlib.h>
#include <stdio.h>

static Window *s_window;
static TextLayer *s_text_layer;
int n = 0;
int t = 1;
char str[100] = "DriveBuddy\nBuzzing Every 1 Sec.";

void up_click_handler(ClickRecognizerRef recognizer, void *context)
{
  t++;
  str[25] = t + '0';
  text_layer_set_text(s_text_layer, str);
}
 
void down_click_handler(ClickRecognizerRef recognizer, void *context)
{
  t--;
  str[25] = t + '0';
  text_layer_set_text(s_text_layer, str);
}
 
void select_click_handler(ClickRecognizerRef recognizer, void *context)
{
 
}

void click_config_provider(void *context)
{
    window_single_click_subscribe(BUTTON_ID_UP, up_click_handler);
    window_single_click_subscribe(BUTTON_ID_DOWN, down_click_handler);
    window_single_click_subscribe(BUTTON_ID_SELECT, select_click_handler);
}

static void tick_handler(struct tm *tick_time, TimeUnits units_changed) {
  if (n == t){
    vibes_long_pulse();
    n = 0;
  }
  else
    n++;
}

static void init(void) {
	// Create a window and get information about the window
	s_window = window_create();
  Layer *window_layer = window_get_root_layer(s_window);
  GRect bounds = layer_get_bounds(window_layer);
	
  // Create a text layer and set the text
	s_text_layer = text_layer_create(bounds);
	text_layer_set_text(s_text_layer, str);
  
  // Set the font and text alignment
	text_layer_set_font(s_text_layer, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD));
	text_layer_set_text_alignment(s_text_layer, GTextAlignmentCenter);

	// Add the text layer to the window
	layer_add_child(window_get_root_layer(s_window), text_layer_get_layer(s_text_layer));
  
  // Enable text flow and paging on the text layer, with a slight inset of 10, for round screens
  text_layer_enable_screen_text_flow_and_paging(s_text_layer, 10);
  
  window_set_click_config_provider(s_window, click_config_provider);
  //window_stack_push(window, true);
  
	// Push the window, setting the window animation to 'true'
	window_stack_push(s_window, true);
  
  tick_timer_service_subscribe(SECOND_UNIT, tick_handler);
	
	// App Logging!
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Just pushed a window!");
}

static void deinit(void) {
	// Destroy the text layer
	text_layer_destroy(s_text_layer);
	
	// Destroy the window
	window_destroy(s_window);
}


int main(void) {
	init();
	app_event_loop();
	deinit();
}
