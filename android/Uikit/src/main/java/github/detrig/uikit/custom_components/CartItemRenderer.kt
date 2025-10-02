package github.detrig.uikit.custom_components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.rememberAsyncImagePainter
import github.detrig.uikit.R
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.ActionDispatcher

object CartItemRenderer {

    @Composable
    fun Render(component: CartItemComponent, state: ScreenState, dispatcher: ActionDispatcher) {
        Card(
            modifier = component.modifier?.toComposeModifier() ?: Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp, horizontal = 16.dp),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color.White
            )
        ) {
            Row(
                verticalAlignment = Alignment.Top,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Checkbox(
                    checked = component.isChecked,
                    onCheckedChange = {
                        component.actions?.forEach { action -> dispatcher.dispatch(action) }
                    },
                    modifier = Modifier.size(21.dp)
                )

                Spacer(modifier = Modifier.width(8.dp))
                Image(
                    painter = rememberAsyncImagePainter(component.imageUrl),
                    contentDescription = component.title,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(96.dp)
                        .clip(RoundedCornerShape(12.dp))
                )

                Spacer(modifier = Modifier.width(8.dp))

                Column(
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        text = "${component.price} ₽",
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp
                    )
                    Text(
                        text = component.title,
                        fontSize = 14.sp,
                        color = Color.Gray,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Row {
                        Row(
                            modifier = Modifier
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color(0xFFF0F0F0))
                        ) {
                            Box(
                                modifier = Modifier
                                    .clickable {
                                        component.actions?.forEach { dispatcher.dispatch(it) }
                                    }
                                    .padding(horizontal = 12.dp, vertical = 6.dp)
                            ) {
                                Text("-", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                            }

                            Text(
                                text = component.quantity.toString(),
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Medium,
                                modifier = Modifier.padding(horizontal = 12.dp)
                            )

                            Box(
                                modifier = Modifier
                                    .clickable {
                                        component.actions?.forEach { dispatcher.dispatch(it) }
                                    }
                                    .padding(horizontal = 12.dp, vertical = 6.dp)
                            ) {
                                Text("+", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = "Купить с доставкой",
                        fontSize = 14.sp,
                        color = Color(0xFF0099F7),
                        modifier = Modifier.padding(vertical = 8.dp)
                    )
                }

                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(
                        painter = painterResource(id = getIconRes(component.isFavorite, "favorite")),
                        contentDescription = "favorite",
                        tint = if (component.isFavorite) Color.Red else Color.Gray,
                        modifier = Modifier.clickable {
                            component.actions?.forEach { dispatcher.dispatch(it) }
                        }
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Icon(
                        painter = painterResource(id = getIconRes(false, "delete")),
                        contentDescription = "delete",
                        modifier = Modifier.clickable {
                            component.actions?.forEach { dispatcher.dispatch(it) }
                        }
                    )
                }
            }
        }
    }

    @Composable
    private fun getIconRes(isFavorite: Boolean, type: String): Int {
        return when (type.lowercase()) {
            "favorite" -> if (isFavorite) R.drawable.ic_favorite else R.drawable.ic_favorite
            "delete" -> R.drawable.ic_delete
            "back" -> R.drawable.img
            else -> R.drawable.img_1
        }
    }
}
